import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const withAuth = new Elysia({ name: "plugin" })
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
  .guard({
    headers: t.Object({
      authorization: t.String(),
    }),
  })
  .macro({
    auth: {
      resolve: async ({ headers, status, jwt }) => {
        const token = headers["authorization"];
        if (!token) return status(401, { message: "Unauthorized" });

        const sanitizedToken = token.replace("Bearer ", "");
        const { id } = await jwt.verify(sanitizedToken);

        return {
          user_id: id,
        };
      },
    },
  });
