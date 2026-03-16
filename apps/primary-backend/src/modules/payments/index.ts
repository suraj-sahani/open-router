import Elysia from "elysia";
import { withAuth } from "../../middleware/auth";
import { PaymentsService } from "./service";
import { PaymentsModel } from "./model";

export const paymentRoutes = new Elysia({ prefix: "/payments" })
  .use(withAuth)
  .post(
    "/on-ramp",
    async ({ status, user_id }) => {
      try {
        const res = await PaymentsService.onRampPayment(user_id);
        return res;
      } catch (error) {
        console.error(error);
        return status(400, {
          message: "Payment failed",
        });
      }
    },
    {
      response: {
        200: PaymentsModel.onRampTransactionResponse,
        400: PaymentsModel.onRampTransactionError,
      },
      auth: true,
    },
  );
