import { prisma } from "db";
import { TAPIKeyModel } from "./model";

export abstract class APIKeyService {
  static async createAPIKey({
    name,
    user_id,
  }: TAPIKeyModel["createAPIKeyBody"]): Promise<
    TAPIKeyModel["createAPIKeyResponse"]
  > {
    const existingKey = await prisma.apiKey.findFirst({
      where: {
        name,
      },
    });

    if (existingKey) throw new Error("API key with same name already exists");

    const generateKey = "sjkbcsdjkbxc";

    const createdKey = await prisma.apiKey.create({
      data: {
        name,
        apiKey: generateKey,
        userId: user_id,
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
  }: TAPIKeyModel["disableAPIKeyBody"]): Promise<
    TAPIKeyModel["disableAPIKeyResponse"]
  > {
    const disabledKey = await prisma.apiKey.update({
      where: {
        id,
      },
      data: {
        disabled: true,
      },
    });

    return {
      message: "API key disabled successfully",
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

  static async getApiKey({
    id,
  }: TAPIKeyModel["getAPIKeyBody"]): Promise<
    TAPIKeyModel["getAPIKeyResponse"]
  > {
    const key = await prisma.apiKey.findUnique({
      where: {
        id,
      },
    });

    if (!key) {
      throw new Error("API key not found");
    }

    return {
      id: key?.id,
      name: key?.name,
      apiKey: key?.apiKey,
      creditsConsumed: key?.creditsConsumed,
      lastUsed: key.lastUsed ? key?.lastUsed?.toISOString() : null,
    };
  }
}
