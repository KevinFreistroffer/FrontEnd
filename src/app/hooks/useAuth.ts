"use client";

import React from "react";
import Cookies from "universal-cookie";
import { decrypt } from "@/utils";

export function useAuth() {
  const [auth, setAuth] = React.useState(false);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const cookie = cookies.get("session")?.value;
    const session = await decrypt(cookie);
    console.log("middleware session", session);

    setAuth(!!session?.userId);
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}
