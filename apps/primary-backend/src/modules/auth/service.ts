import { AuthModel, type TAuthModel } from "./model";

export abstract class AuthService {
  static async signIn({ email, password }: TAuthModel["signInBody"]) {
    return {
      message: "Signed in successfully",
      token: "token",
    };
  }

  static async signUp({ email, password }: TAuthModel["signUpBody"]) {
    return {
      message: "Signed up successfully",
      id: "id",
    };
  }
}
