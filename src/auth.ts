import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from '@auth/sveltekit/providers/credentials'
import { SvelteKitAuth } from "@auth/sveltekit";
import { db } from "./db";
import { accounts, authenticators, sessions, users, verificationTokens } from "./db/schema";

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
                // TODO: handle auth
                return {id: "hello"}
            }
        })
    ]
})
