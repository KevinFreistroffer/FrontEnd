"use server";

import { createSession, updateSession } from "@/lib/session";

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
  updateSession();
  // console.log(formData);
  // const username = formData.get("username");
  // const email = formData.get("email");
  // const password = formData.get("password");
  // console.log(username);
  // console.log(email);
  // console.log(password);
  // const response = await fetch("http://localhost:3001/user/signup", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     username,
  //     email,
  //     password,
  //   }),
  // });

  // updateSession();

  // if (response.status === 200) {
  //   console.log("User created successfully");

  //   const body = await response.json();
  //   console.log(body);

  //   if ("user" in body.data && body.data.user._id) {
  //     await createSession(body.data.user._id);
  //   }

  //   // Previous steps:
  //   // 1. Validate form fields
  //   // 2. Prepare data for insertion into database
  //   // 3. Insert the user into the database or call an Library API
  //   // Current steps:
  //   // 4. Create user session

  //   //   // 5. Redirect user
  //   //   redirect("/profile");
  //   //   return formData;
  // }
}
