import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";

export const withAuth = new Elysia()
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET! }))
  .guard({
    headers: t.Object({
      auth: t.String(),
    }),
  })
  .resolve(({ headers, status, jwt }) => {
    const token = headers["auth"];

    if (!token) return status(401, { message: "Unauthorized" });

    const decoded = jwt.verify(token);

    console.log(decoded);

    return {
      user_id: "some_radom_id",
    };
  });
