"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
const saltRounds = 10;
import styles from "./styles.module.css";
import Input from "./input";

const Form: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [hash, setHash] = useState<string>();

  const handleStaySignedInChange = (v: any) => {
    setStaySignedIn(v);
  };

  const handleUsernameOrEmailChange = (v: any) => {
    setUsernameOrEmail(v);
  };

  const handlePasswordChange = (v: any) => {
    setPassword(v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.persist();
    console.log("handleSubmit", usernameOrEmail, password, staySignedIn);
    // Add your login logic here

    const salt = await bcrypt.genSalt(saltRounds);
    // const hash = await bcrypt.hash(password, salt);
    // setHash(hash);

    const response = await fetch("http://localhost:3001/user/login", {
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

    const data = await response.json();
    console.log("data", data);

    if (data.data.jwtToken) {
      localStorage.setItem("jwtToken", data.data.jwtToken);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="usernameOrEmail"
        label="Username or email"
        handleChange={handleUsernameOrEmailChange}
      />
      <Input
        type="password"
        name="password"
        label="Password"
        handleChange={handlePasswordChange}
      />
      <div className="flex my-4 self-center">
        <label htmlFor="staySignedIn" className="mr-1 text-sm">
          Stay signed in?
        </label>
        <input
          type="checkbox"
          name="staySignedIn"
          id="staySignedIn"
          defaultChecked={staySignedIn}
          onClick={(e) => {
            // console.log("checked", e.target.value);
            handleStaySignedInChange(!staySignedIn);
          }}
        />
      </div>
      <button
        id={styles["button"]}
        className="border rounded p-3 mt-4 bg-black text-white w-full"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Form;
