import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

//using promisify to  configure scryt which is  call back based to be promise based 
const scryptAsync = promisify(scrypt);


export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString("hex");
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buf.toString("hex")}.${salt}`;

    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');

        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString("hex") === hashedPassword;

    }
}