import { Elysia } from "elysia";
import { AuthService } from "./service";
import { AuthModel } from "./model";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/sign-in",
    async ({ body, cookie: { session } }) => {
      const response = await AuthService.signIn(body);
      return response;
    },
    {
      body: AuthModel.signInBody,
      response: {
        200: AuthModel.signInResponse,
        400: AuthModel.signInInvalid,
      },
    },
  )
  .post(
    "/sign-up",
    async ({ body }) => {
      const response = await AuthService.signUp(body);
      return response;
    },
    {
      body: AuthModel.signInBody,
      response: {
        200: AuthModel.signUpResponse,
        400: AuthModel.signUpUserExists,
      },
    },
  );
