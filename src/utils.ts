import bcrypt from "bcryptjs";
import { ISessionPayload } from "./app/lib/definitions";
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";

export const encrypt = (data: any): string | Error => {
  try {
    console.log("encrypting data", data);
    if (process.env.SESSION_SECRET) {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.SESSION_SECRET
      ).toString();
    }

    throw new Error("env.SESSION_SECRET not defined");
  } catch (error) {
    return handleCaughtError(error);
  }
};

export const decrypt = (data: any): any => {
  try {
    if (process.env.SESSION_SECRET) {
      const bytes = CryptoJS.AES.decrypt(data, process.env.SESSION_SECRET);
      if (!bytes) {
        throw new Error("Failed to decrypt data");
      }
      return bytes.toString(CryptoJS.enc.Utf8);
    } else {
    }
  } catch (error) {
    return handleCaughtError(error);
  }
};

export const hashValue = async (value: any): Promise<string | Error> => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    if (!salt) {
      throw new Error("Failed to generate salt");
    }
    const hash = await bcrypt.hash(value, salt);

    if (!hash) {
      throw new Error("Failed to generate hash");
    }

    return hash;
  } catch (error: any) {
    console.log("caught error", error);
    return handleCaughtError(error);
  }
};

export const validateSession = async (): Promise<boolean> => {
  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);
  console.log("middleware session", session);

  // 5. Redirect to /login if the user is not authenticated
  if (!session?.userId) {
    return false;
  }

  return true;
};

export const handleCaughtError = (error: any) => {
  console.log("caught error", error);
  return new Error(error);
  // if (error instanceof Error) {
  //   return error;
  // }

  // return new Error(error);
};
