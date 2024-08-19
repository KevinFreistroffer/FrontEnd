import "server-only";
import { cookies } from "next/headers";
import { handleCaughtError, hashValue } from "@/utils";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export function encrypt(userId: string): Promise<string | Error> {
  try {
    return new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
  } catch (error) {
    console.log("caught error: ", error);
    // return error;
    return handleCaughtError(error);
  }
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  console.log("createSession userId", userId);
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //   const session = await encrypt({ userId, expiresAt });
    const session = await encrypt(userId); // so this will encrypt the value

    if (session instanceof Error) {
      console.error(session);
      return;
    }

    console.log("encrypted session", session, typeof session);
    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.log("caught error: ", error);
    // return error;
    return;
  }
}

export async function updateSession() {
  try {
    const session = cookies().get("session")?.value;
    console.log("cookie session value", session);
    const payload = await decrypt(session);
    console.log("decrypted session", payload);

    if (payload instanceof Error) {
      throw payload;
    }

    if (!session || !payload) {
      return null;
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: "lax",
      path: "/",
    });
  } catch (error) {
    console.log("caught error: ", error);
    // return error;
  }
}
