import { fail, redirect } from "@sveltejs/kit";
import { } from "drizzle-orm/better-sqlite3"
import type { Actions } from "./$types"
import * as v from "valibot";
import { db } from "../../../db";
import { users } from "../../../db/schema";
import { saltAndHash } from "$lib/utils/password";

const signUpSchema = v.object({
    name: v.pipe(v.string(), v.nonEmpty()),
    email: v.pipe(v.string(), v.nonEmpty(), v.email()),
    password: v.pipe(v.string(), v.nonEmpty()),
})

export const actions = {
    default: async (event) => {
        try {
            const formData = await event.request.formData()
            const result = v.safeParse(signUpSchema, Object.fromEntries(formData.entries()))
            if (!result.success) {
                return fail(400, { message: "Invalid data" })
            }

            const password = saltAndHash(result.output.password)

            const { name, email } = result.output;

            await db.insert(users).values({ name, email, password })
        } catch (e) {
            if (e && typeof e === "object" && "code" in e && e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                return fail(400, { emailDuplicate: true })
            }
            return fail(500, { message: "Internal Server Error" })
        }

        return redirect(303, "/")
    }
} satisfies Actions
