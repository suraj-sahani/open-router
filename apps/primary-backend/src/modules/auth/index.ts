import { Elysia } from "elysia";
import { AuthService } from "./service";
import { AuthModel } from "./model";
import jwt from "@elysiajs/jwt";
import { withAuth } from "../../middleware/auth";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(withAuth)
  .post(
    "/sign-in",
    async ({ body, cookie: { auth }, status, jwt }) => {
      try {
        const response = await AuthService.signIn(body);

        if (!response)
          return status(400, { message: "Invalid username or password" });

        const { user_id } = response;
        const token = await jwt.sign({
          id: user_id,
        });

        auth.set({
          value: token,
          httpOnly: true,
          maxAge: 7 * 86400,
          path: "/",
        });

        return {
          message: "Sign in successful",
          user_id: user_id,
        };
      } catch (error) {
        return status(400, { message: "Invalid username or password" });
      }
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
        const { password, email } = body;
        const hashedPassword = await Bun.password.hash(password);
        const response = await AuthService.signUp({
          email,
          password: hashedPassword,
        });
        return response;
      } catch (error) {
        // TODO: Cretae a global error handler package to handle all kind of errors
        console.error(error);
        return status(400, {
          message: "Sign up failed",
        });
      }
    },
    {
      body: AuthModel.signUpBody,
      response: {
        200: AuthModel.signUpResponse,
        400: AuthModel.signUpError,
      },
    },
  );
