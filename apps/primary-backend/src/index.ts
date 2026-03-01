import { Elysia } from "elysia";
import { authRoutes } from "./modules/auth";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

app.use(authRoutes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
