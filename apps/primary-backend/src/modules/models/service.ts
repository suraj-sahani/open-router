import { prisma } from "db";
import { TLLMModel } from "./model";

export abstract class ModelsService {
  static async getModels(): Promise<TLLMModel["getModelsResponse"]> {
    const models = await prisma.model.findMany({
      include: {
        company: true,
      },
    });

    return {
      models,
    };
  }

  static async getAllProviders(): Promise<
    TLLMModel["getAllProvidersResponseSchema"]
  > {
    const providers = await prisma.model.findMany({
      include: {
        company: true,
      },
    });

    const formattedProviders = providers.map(({ id, name, company }) => ({
      id,
      name,
      website: company.website,
    }));

    return {
      providers: formattedProviders,
    };
  }

  static async getProvidersForModel({
    model_id,
  }: TLLMModel["getProvidersForModelBody"]): Promise<
    TLLMModel["getProvidersForModelResponse"]
  > {
    const providerForModel = await prisma.modelProviderMapping.findMany({
      where: {
        id: model_id,
      },
      include: {
        provider: true,
      },
    });

    const formattedProvidersForModel = providerForModel.map(
      ({ id, inputTokenCost, outputTokenCost, provider }) => ({
        id,
        inputTokenCost,
        outputTokenCost,
        providerId: provider.id,
        providerName: provider.name,
        providerWebsite: provider.website,
      }),
    );

    return {
      providers: formattedProvidersForModel,
    };
  }
}
