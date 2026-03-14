// Model define the data structure and validation for the request and response
import { t, type UnwrapSchema } from "elysia";

export const AuthModel = {
  signInBody: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signInResponse: t.Object({
    message: t.String(),
    user_id: t.String(),
  }),
  signInError: t.Object({
    message: t.Literal("Invalid username or password"),
  }),
  signUpBody: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signUpResponse: t.Object({
    message: t.String(),
    id: t.String(),
  }),
  signUpError: t.Object({
    message: t.Literal("Sign up failed"),
  }),
} as const;

// Optional, cast all model to TypeScript type
export type TAuthModel = {
  [K in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[K]>;
};
