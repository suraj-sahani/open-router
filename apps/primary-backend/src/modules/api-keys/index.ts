import Elysia from "elysia";
import { withAuth } from "../../middleware/auth";
import { APIKeyModel } from "./model";
import { APIKeyService } from "./service";

export const apiKeysRoutes = new Elysia({ prefix: "/api-keys" })
  .use(withAuth)
  .post(
    "/",
    async ({ body, status, user_id }) => {
      try {
        const res = await APIKeyService.createAPIKey({
          name: body.name,
          user_id,
        });

        return res;
      } catch (error) {
        console.dir(error, { depth: Infinity });
        return status(400, {
          message:
            error instanceof Error ? error?.message : "API key creation failed",
        });
      }
    },
    {
      body: APIKeyModel.createAPIKeyBody,
      response: {
        200: APIKeyModel.createAPIKeyResponse,
        400: APIKeyModel.createAPIKeyError,
      },
      auth: true,
    },
  )
  .get(
    "/",
    async ({ user_id, status }) => {
      try {
        const res = await APIKeyService.getApiKeys({
          user_id,
        });

        return res;
      } catch (error) {
        console.error(error);
        return status(500, { message: "Internal server error" });
      }
    },
    {
      body: APIKeyModel.getAPIKeysBody,
      response: {
        200: APIKeyModel.getAPIKeysResponse,
        500: APIKeyModel.getAPIKeysError,
      },
      auth: true,
    },
  )
  .patch(
    "/:id/disable",
    async ({ user_id, status, params: { id } }) => {
      try {
        console.dir({ id, user_id });
        const res = await APIKeyService.disableAPIKey({
          id,
          user_id,
        });

        return res;
      } catch (error) {
        console.error(error);
        return status(400, { message: "API key disable failed" });
      }
    },
    {
      response: {
        200: APIKeyModel.disableAPIKeyResponse,
        400: APIKeyModel.disableAPIKeyError,
      },
      auth: true,
    },
  )
  .patch(
    "/:id/enable",
    async ({ params: { id }, user_id, status }) => {
      try {
        console.dir({ id, user_id });
        const res = await APIKeyService.enableAPIKey({
          id,
          user_id,
        });

        return res;
      } catch (error) {
        console.error(error);
        return status(400, { message: "API key enable failed" });
      }
    },
    {
      response: {
        200: APIKeyModel.enableAPIKeyResponse,
        400: APIKeyModel.enableAPIKeyError,
      },
      auth: true,
    },
  )
  .delete(
    "/:id",
    async ({ user_id, status, params: { id } }) => {
      try {
        const res = await APIKeyService.deleteAPIKey({
          id,
          user_id,
        });

        return res;
      } catch (error) {
        console.error(error);
        return status(400, { message: "API key deletion failed" });
      }
    },
    {
      response: {
        200: APIKeyModel.deleteAPIKeyResponse,
        400: APIKeyModel.deleteAPIKeyError,
      },
      auth: true,
    },
  );
