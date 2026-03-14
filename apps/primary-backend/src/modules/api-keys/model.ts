import { t, type UnwrapSchema } from "elysia";

export const APIKeyModel = {
  createAPIKeyBody: t.Object({
    name: t.String(),
    user_id: t.String(),
  }),
  createAPIKeyResponse: t.Object({
    message: t.String(),
    id: t.String(),
    apiKey: t.String(),
  }),
  createAPIKeyError: t.Object({
    message: t.Literal("API key creation failed"),
  }),

  disableAPIKeyBody: t.Object({
    id: t.String(),
  }),
  disableAPIKeyResponse: t.Object({
    message: t.String(),
  }),
  disableAPIKeyError: t.Object({
    message: t.Literal("API key disable failed"),
  }),

  getAPIKeyBody: t.Object({
    id: t.String(),
  }),
  getAPIKeyResponse: t.Object({
    lastUsed: t.Nullable(t.String()),
    id: t.String(),
    name: t.String(),
    apiKey: t.String(),
    creditsConsumed: t.Number(),
  }),
  getAPIKeyError: t.Object({
    message: t.Literal("API key not found"),
  }),

  deleteAPIKeyBody: t.Object({
    id: t.String(),
  }),
  deleteAPIKeyResponse: t.Object({
    message: t.Literal("API key deleted successfully"),
  }),
  deleteAPIKeyError: t.Object({
    message: t.Literal("API key deletion failed"),
  }),
};

export type TAPIKeyModel = {
  [K in keyof typeof APIKeyModel]: UnwrapSchema<(typeof APIKeyModel)[K]>;
};
