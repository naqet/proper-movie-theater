import { genSaltSync, hashSync } from "bcrypt"

export function saltAndHash(pass: string): string {
    const salt = genSaltSync(10)
    const hashedPass = hashSync(pass, salt)
    return hashedPass;
}
