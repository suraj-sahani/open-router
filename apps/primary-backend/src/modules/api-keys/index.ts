import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";
import { withAuth } from "../../middleware/auth";

export const apiKeysRoutes = withAuth
  .post("/", async ({ body, cookie, status, jwt, user_id }) => {})
  .get("/", async () => {})
  .patch("/disable", async () => {})
  .delete("/", async () => {});
