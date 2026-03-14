import { prisma } from "db";
import { type TAuthModel } from "./model";

export abstract class AuthService {
  static async signIn({ email, password }: TAuthModel["signInBody"]) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const matchPassword = await Bun.password.verify(password, user.password);

    if (!matchPassword) {
      return null;
    }

    return {
      message: "Signed in successfully",
      user,
    };
  }

  static async signUp({ email, password }: TAuthModel["signUpBody"]) {
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
