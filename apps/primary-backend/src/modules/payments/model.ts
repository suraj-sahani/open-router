import { t, UnwrapSchema } from "elysia";

export const PaymentsModel = {
  onRampTransactionResponse: t.Object({
    credits: t.Number(),
  }),

  onRampTransactionError: t.Object({
    message: t.String(),
  }),
};

export type TPaymentsModel = {
  [K in keyof typeof PaymentsModel]: UnwrapSchema<(typeof PaymentsModel)[K]>;
};
