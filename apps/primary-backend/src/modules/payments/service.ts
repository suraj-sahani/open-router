import { prisma } from "db";
import { TPaymentsModel } from "./model";

const ON_RAMP_AMOUNT = 1000;

export abstract class PaymentsService {
  static async onRampPayment(
    user_id: string,
  ): Promise<TPaymentsModel["onRampTransactionResponse"]> {
    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          credits: {
            increment: ON_RAMP_AMOUNT,
          },
        },
      }),

      prisma.onRampTransaction.create({
        data: {
          userId: user_id,
          amount: ON_RAMP_AMOUNT,
          status: "completed",
        },
      }),
    ]);

    return { credits: user.credits };
  }
}
