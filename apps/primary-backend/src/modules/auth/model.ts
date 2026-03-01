// Model define the data structure and validation for the request and response
import { t, type UnwrapSchema } from "elysia";

export const AuthModel = {
  signInBody: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signInResponse: t.Object({
    message: t.String(),
    token: t.String(),
  }),
  signInInvalid: t.Literal("Invalid username or password"),

  signUpBody: t.Object({
    email: t.String(),
    password: t.String(),
  }),
  signUpResponse: t.Object({
    message: t.String(),
    id: t.String(),
  }),
  signUpUserExists: t.Literal("User already exists"),
} as const;

// Optional, cast all model to TypeScript type
export type TAuthModel = {
  [k in keyof typeof AuthModel]: UnwrapSchema<(typeof AuthModel)[k]>;
};
