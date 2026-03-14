import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { withAuth } from "../../middleware/auth";

export const apiKeysRoutes = new Elysia({ prefix: "/api-keys" })
  .use(withAuth)
  .post("/", async ({ body, cookie, status, jwt }) => {})
  .get("/", async () => {})
  .patch("/disable", async () => {})
  .delete("/", async () => {});
