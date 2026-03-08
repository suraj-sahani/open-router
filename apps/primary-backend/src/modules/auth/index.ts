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
        400: AuthModel.signInError,
      },
    },
  )
  .post(
    "/sign-up",
    async ({ body, status }) => {
      try {
        const { password, email } = body
        const hashedPassword = await Bun.password.hash(password)
        const response = await AuthService.signUp({
          email, password: hashedPassword
        });
        return response;

      } catch (error) {
        // TODO: Cretae a global error handler package to handle all kind of errors
        console.error(error)
        return status(400, {
          message: 'Sign up failed'
        })
      }
    },
    {
      body: AuthModel.signUpBody,
      response: {
        200: AuthModel.signUpResponse,
        400: AuthModel.signUpError
      },
    },
  );
