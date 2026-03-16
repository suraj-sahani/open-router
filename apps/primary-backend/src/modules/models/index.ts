import Elysia from "elysia";
import { ModelsService } from "./service";
import { LLMModelsModel } from "./model";

export const modelRoutes = new Elysia({ prefix: "/models" })
  .get(
    "/",
    async ({ status }) => {
      try {
        const res = await ModelsService.getModels();

        return res;
      } catch (error) {
        console.error(error);
        return status(500, {
          message: "Failed to get models",
        });
      }
    },
    {
      response: {
        200: LLMModelsModel.getModelsResponse,
        500: LLMModelsModel.genericServiceError,
      },
    },
  )
  .get(
    "/providers",
    async ({ status }) => {
      try {
        const res = await ModelsService.getAllProviders();

        return res;
      } catch (error) {
        console.error(error);
        return status(500, {
          message: "Failed to get all providers",
        });
      }
    },
    {
      response: {
        200: LLMModelsModel.getAllProvidersResponseSchema,
        500: LLMModelsModel.genericServiceError,
      },
    },
  )
  .get(
    "/:id/providers",
    async ({ params: { id }, status }) => {
      try {
        const res = await ModelsService.getProvidersForModel({
          model_id: id,
        });

        return res;
      } catch (error) {
        console.error(error);
        return status(500, {
          message: "Failed to get all providers",
        });
      }
    },
    {
      response: {
        200: LLMModelsModel.getProvidersForModelResponse,
        500: LLMModelsModel.genericServiceError,
      },
    },
  );
