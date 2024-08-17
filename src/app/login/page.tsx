"use client";

import React, { useState } from "react";
import bcrypt from "bcryptjs";
const saltRounds = 10;

const LoginForm: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState<string>();
  const [staySignedIn, setStaySignedIn] = useState(false);

  const handleStaySignedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaySignedIn(e.target.checked);
  };

  const handleUsernameOrEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameOrEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    setHash(hash);

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

    if (data.data.jwtToken) {
      localStorage.setItem("jwtToken", data.data.jwtToken);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameOrEmail">Username or email:</label>
        <input
          type="text"
          id="usernameOrEmail"
          value={usernameOrEmail}
          onChange={handleUsernameOrEmailChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="staySignedIn"
          checked={staySignedIn}
          onChange={handleStaySignedInChange}
        />
        <label htmlFor="staySignedIn">Stay signed in?</label>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
