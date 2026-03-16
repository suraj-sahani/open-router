import Elysia from "elysia";
import { ModelsService } from "./service";
import { LLMModelsModel } from "./model";

export const modelRoutes = new Elysia({ prefix: "/models" })
  .get("/", async ({ status }) => {
    try {
      const res = await ModelsService.getModels();

      return res;
    } catch (error) {
      console.error(error);
      return status(400, { message: "Failed to get models" });
    }
  })
  .get("/providers", async ({ status }) => {
    try {
      const res = await ModelsService.getAllProviders();

      return res;
    } catch (error) {
      console.error(error);
      return status(400, { message: "Failed to get all providers" });
    }
  })
  .get("/:id/providers", async ({ params: { id }, status }) => {
    try {
      const res = await ModelsService.getProvidersForModel({
        model_id: id,
      });

      return res;
    } catch (error) {
      console.error(error);
      return status(400, { message: "Failed to get all providers" });
    }
  });
