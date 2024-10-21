import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { nanoid } from "nanoid";

type AuthCallbackResult = {
  success: boolean;
};

export const appRouter = router({
  authCallback: publicProcedure.query(async (): Promise<AuthCallbackResult> => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user.id || !user.email) throw new Error( "UNAUTHORIZED" );

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    const userId = nanoid(24);

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: userId,
          email: user.email,
        },
      });
    }

    return {
      success: true,
    };
  }),
});

export type AppRouter = typeof appRouter;
