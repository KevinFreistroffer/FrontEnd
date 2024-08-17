import bcrypt from "bcryptjs";
import { ISessionPayload } from "./lib/definitions";
import CryptoJS from "crypto-js";

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

export const validateSession = async (sessionPayload: ISessionPayload) => {
  await bcrypt.compare(sessionPayload.user.id, sessionPayload.user.id);
};

export const handleCaughtError = (error: any) => {
  console.log("caught error", error);
  return new Error(error);
  // if (error instanceof Error) {
  //   return error;
  // }

  // return new Error(error);
};
