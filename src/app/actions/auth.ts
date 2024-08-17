"use server";

import { createSession, updateSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export interface IFormState {
  username: string;
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  journalCategories: any[];
  journals: any[];
}

export interface IUserResponse {
  code: number;
  description: string;
  user: IUser;
}

export async function signup(formData: FormData) {
  console.log(formData);
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(username);
  console.log(email);
  console.log(password);
  const response = await fetch("http://localhost:3001/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.status === 200) {
    console.log("User created successfully");

    const body = await response.json();
    console.log(body);

    if ("user" in body.data && body.data.user._id) {
      await createSession(body.data.user._id);
    }

    // Previous steps:
    // 1. Validate form fields
    // 2. Prepare data for insertion into database
    // 3. Insert the user into the database or call an Library API
    // Current steps:
    // 4. Create user session

    //   // 5. Redirect user
    redirect("/table");
    //   return formData;
  }
}

export async function signin(formData: FormData) {
  console.log(formData);
  const usernameOrEmail = formData.get("usernameOrEmail");
  const password = formData.get("password");
  const staySignedIn = formData.get("staySignedIn");
  console.log(usernameOrEmail);
  console.log(password);
  console.log(staySignedIn);
  const response = await fetch("http://localhost:3001/user/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usernameOrEmail,
      password,
      staySignedIn,
    }),
  });

  if (response.status === 200) {
    const body = await response.json();
    if ("token" in body.data && body.data.token) {
      await createSession(body.data.user._id);
    }

    // Previous steps:
    // 1. Validate form fields
    // 2. Prepare data for insertion into database
    // 3. Insert the user into the database or call an Library API
    // Current steps:
    // 4. Create user session

    //   // 5. Redirect user
    redirect("/table");
    //   return formData;
  }
}
