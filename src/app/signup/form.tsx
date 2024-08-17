"use client";

import React, { useState } from "react";
import { signup } from "../actions/auth";
import Input from "./input";
import styles from "./styles.module.css";
// import "../../envConfig";

const Form = () => {
  const [username, setUsername] = useState("");
  const [deleted, setDeleted] = useState<boolean>(false);
  const handleUsernameChange = async (v: any) => {
    console.log(v, v, v);
  };
  const handleEmailChange = async (v: any) => {
    console.log(v, v, v);
  };
  const handlePasswordChange = async (v: any) => {
    console.log(v, v, v);
  };

  return (
    <form action={signup}>
      <Input
        type="text"
        name="username"
        label="Username"
        handleChange={handleUsernameChange}
      />
      <Input
        type="email"
        name="email"
        label="Email"
        handleChange={handleEmailChange}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        handleChange={handlePasswordChange}
      />
      <button
        id={styles["button"]}
        className="border rounded p-3 mt-4 bg-black text-white w-full"
        type="submit"
      >
        Sign Up
      </button>
      <button
        type="button"
        id={styles["button"]}
        className="border rounded p-3 mt-4 bg-black text-white w-full"
        onClick={async () => {
          setDeleted(false);
          const accessKey = process.env.NEXT_PUBLIC_API_ACCESS_KEY;
          console.log(accessKey);

          if (accessKey) {
            const response = await fetch(
              "http://localhost:3001/user/delete-all",
              {
                method: "DELETE",
                headers: {
                  "access-key": accessKey,
                },
              }
            );
            console.log("delete-all response", response);
            if (response.status === 200) {
              setDeleted(true);
            }
          }
        }}
      >
        Delete users{" "}
        {deleted ? <span className="fa-solid fa-check"></span> : null}
      </button>
    </form>
  );
};

export default Form;
