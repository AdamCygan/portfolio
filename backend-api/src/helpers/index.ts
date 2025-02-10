import crypto from "crypto";

const SECRET = process.env.SECRET || "newcryptosecretstring";

export const random = () => crypto.randomBytes(16).toString("hex");

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", `${salt}/${password}`)
    .update(SECRET)
    .digest("hex");
};
