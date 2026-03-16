import { t, UnwrapSchema } from "elysia";

export const LLMModelsModel = {
  getModelsResponse: t.Object({
    models: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        slug: t.String(),
        company: t.Object({
          id: t.String(),
          name: t.String(),
          website: t.String(),
        }),
      }),
    ),
  }),

  getAllProvidersResponseSchema: t.Object({
    providers: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        website: t.String(),
      }),
    ),
  }),

  getProvidersForModelBody: t.Object({
    model_id: t.String(),
  }),

  getProvidersForModelResponse: t.Object({
    providers: t.Array(
      t.Object({
        id: t.String(),
        providerId: t.String(),
        providerName: t.String(),
        providerWebsite: t.String(),
        inputTokenCost: t.Number(),
        outputTokenCost: t.Number(),
      }),
    ),
  }),
};

export type TLLMModel = {
  [K in keyof typeof LLMModelsModel]: UnwrapSchema<(typeof LLMModelsModel)[K]>;
};
