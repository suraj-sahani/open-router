import { t, type UnwrapSchema } from "elysia";

export const APIKeyModel = {
  createAPIKeyBody: t.Object({
    name: t.String(),
    user_id: t.Optional(t.String()),
  }),
  createAPIKeyResponse: t.Object({
    message: t.String(),
    id: t.String(),
    apiKey: t.String(),
  }),
  createAPIKeyError: t.Object({
    message: t.String(),
  }),

  disableAPIKeyBody: t.Object({
    id: t.String(),
    user_id: t.String(),
  }),
  disableAPIKeyResponse: t.Object({
    message: t.String(),
  }),
  disableAPIKeyError: t.Object({
    message: t.Literal("API key disable failed"),
  }),

  enableAPIKeyBody: t.Object({
    id: t.String(),
    user_id: t.String(),
  }),
  enableAPIKeyResponse: t.Object({
    message: t.String(),
  }),
  enableAPIKeyError: t.Object({
    message: t.Literal("API key enable failed"),
  }),

  getAPIKeysBody: t.Object({
    user_id: t.String(),
  }),
  getAPIKeysResponse: t.Object({
    apiKeys: t.Array(
      t.Object({
        lastUsed: t.Nullable(t.String()),
        id: t.String(),
        name: t.String(),
        apiKey: t.String(),
        creditsConsumed: t.Number(),
        disabled: t.Boolean(),
      }),
    ),
  }),
  getAPIKeysError: t.Object({
    message: t.String(),
  }),

  deleteAPIKeyBody: t.Object({
    id: t.String(),
    user_id: t.String(),
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
