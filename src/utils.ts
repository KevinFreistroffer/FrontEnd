import bcrypt from "bcryptjs";
import { ISessionPayload } from "./app/lib/definitions";
import CryptoJS from "crypto-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

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

export const decrypt = async (data: any): Promise<any> => {
  try {
    if (data === undefined) {
      return new Error("data is undefined");
    }
    console.log("decrypt", data);
    console.log("SESSIONS_SECRET", process.env.SESSION_SECRET);
    if (process.env.SESSION_SECRET) {
      const bytes = CryptoJS.AES.decrypt(data, process.env.SESSION_SECRET);
      console.log("bytes", bytes);
      if (!bytes) {
        throw new Error("Failed to decrypt data");
      }
      const str = bytes.toString();
      console.log("bytes str", str);
      return str;
    } else {
      throw new Error("env.SESSION_SECRET not defined");
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
  console.log("validateSession()");
  // const cookie = cookies().get("session")?.value;
  // if (!cookie) {
  //   return false;
  // }
  // const session = await decrypt(cookie);
  // console.log("middleware session", session);
  // if (!session?.userId) {
  //   return false;
  // }
  // return true;

  const n = Math.random() * 10;

  if (n > 5) {
    redirect("/");
  } else {
    redirect("/about");
  }
};

export const handleCaughtError = (error: any) => {
  console.log("caught error", error);

  if (error instanceof Error) {
    return error.message;
  }

  return new error.toString();
};
