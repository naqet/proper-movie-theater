import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from '@auth/sveltekit/providers/credentials'
import { CredentialsSignin, SvelteKitAuth } from "@auth/sveltekit";
import { db } from "./db";
import * as v from "valibot";
import { accounts, authenticators, sessions, users, verificationTokens } from "./db/schema";
import { eq } from "drizzle-orm";
import { compareSync } from "bcrypt";

const loginSchema = v.object({
    email: v.pipe(v.string(), v.email(), v.nonEmpty()),
    password: v.pipe(v.string(), v.nonEmpty())
})

export const { handle } = SvelteKitAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        authenticatorsTable: authenticators,
        verificationTokensTable: verificationTokens
    }),
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const result = v.safeParse(loginSchema, credentials)

                if (!result.success) {
                    return null
                }

                const {email, password} = result.output;

                const user = (await db.select().from(users).limit(1).where(eq(users.email, email))).at(0)

                if (!user || !user.password) {
                    throw new CredentialsSignin("Invalid credentials")
                }

                const correctPass = compareSync(password, user.password)

                if (!correctPass) {
                    throw new CredentialsSignin("Invalid credentials")
                }

                return { email }
            }
        })
    ]
})
