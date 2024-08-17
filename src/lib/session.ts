import "server-only";
import { cookies } from "next/headers";
import { decrypt, encrypt, hashValue } from "@/utils";

export async function createSession(userId: string) {
  try {
    console.log("createSession");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    //   const session = await encrypt({ userId, expiresAt });
    const session = await encrypt(userId); // so this will encrypt the value

    if (session instanceof Error) {
      throw session;
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
