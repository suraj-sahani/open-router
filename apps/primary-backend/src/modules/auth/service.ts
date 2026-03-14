import { prisma } from "db";
import { type TAuthModel } from "./model";

export abstract class AuthService {
  static async signIn({
    email,
    password,
  }: TAuthModel["signInBody"]): Promise<TAuthModel["signInResponse"]> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const matchPassword = await Bun.password.verify(password, user.password);

    if (!matchPassword) {
      throw new Error("Invalid username or password.");
    }

    return {
      message: "Signed in successfully",
      user_id: user.id,
    };
  }

  static async signUp({
    email,
    password,
  }: TAuthModel["signUpBody"]): Promise<TAuthModel["signUpResponse"]> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    return {
      message: "Signed up successfully",
      id: user.id,
    };
  }
}
