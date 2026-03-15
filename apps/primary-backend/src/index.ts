import { Elysia } from "elysia";
import { authRoutes } from "./modules/auth";
import { apiKeysRoutes } from "./modules/api-keys";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

app.use(authRoutes);
app.use(apiKeysRoutes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
