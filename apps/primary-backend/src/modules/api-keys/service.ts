import { prisma } from "db";
import { randomBytes } from "crypto";
import { TAPIKeyModel } from "./model";

export abstract class APIKeyService {
  static generateApiKey(length: number = 32): string {
    try {
      const prefix = "sk-or-v1-";

      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const bytes = randomBytes(length);

      let randomPart = "";
      for (let i = 0; i < length; i++) {
        randomPart += chars[bytes[i] % chars.length];
      }

      return `${prefix}${randomPart}`;
    } catch (error) {
      throw new Error("API key generation failed");
    }
  }

  static async createAPIKey({
    name,
    user_id,
  }: TAPIKeyModel["createAPIKeyBody"]): Promise<
    TAPIKeyModel["createAPIKeyResponse"]
  > {
    const existingKey = await prisma.apiKey.findFirst({
      where: {
        name,
        userId: user_id,
      },
    });

    if (existingKey) throw new Error("API key with same name already exists");

    const generateKey = this.generateApiKey();

    const createdKey = await prisma.apiKey.create({
      data: {
        name,
        apiKey: generateKey,
        userId: user_id || "",
      },
    });

    return {
      apiKey: createdKey.apiKey,
      id: createdKey.id,
      message: "API key created successfully",
    };
  }

  static async disableAPIKey({
    id,
    user_id,
  }: TAPIKeyModel["disableAPIKeyBody"]): Promise<
    TAPIKeyModel["disableAPIKeyResponse"]
  > {
    const disabledKey = await prisma.apiKey.update({
      where: {
        id,
        userId: user_id,
      },
      data: {
        disabled: true,
      },
    });

    return {
      message: "API key disabled successfully",
    };
  }

  static async enableAPIKey({
    id,
    user_id,
  }: TAPIKeyModel["enableAPIKeyBody"]): Promise<
    TAPIKeyModel["enableAPIKeyResponse"]
  > {
    const enabledKey = await prisma.apiKey.update({
      where: {
        id,
        userId: user_id,
      },
      data: {
        disabled: false,
      },
    });

    return {
      message: "API key enabled successfully",
    };
  }

  static async deleteAPIKey({
    id,
  }: TAPIKeyModel["deleteAPIKeyBody"]): Promise<
    TAPIKeyModel["deleteAPIKeyResponse"]
  > {
    await prisma.apiKey.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });

    return {
      message: "API key deleted successfully",
    };
  }

  static async getApiKeys({
    user_id,
  }: TAPIKeyModel["getAPIKeysBody"]): Promise<
    TAPIKeyModel["getAPIKeysResponse"]
  > {
    const keys = await prisma.apiKey.findMany({
      where: {
        userId: user_id,
      },
    });

    const apiKeys = keys.map(
      ({ apiKey, name, creditsConsumed, lastUsed, id, disabled }) => ({
        name,
        apiKey,
        creditsConsumed,
        lastUsed: lastUsed ? lastUsed.toISOString() : null,
        disabled,
        id,
      }),
    );

    return {
      apiKeys,
    };
  }
}
