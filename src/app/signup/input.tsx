"use client";

import React, { ChangeEvent, useState } from "react";

interface InputProps {
  name: string;
  type: "text" | "email" | "password";
  label: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ name, type, label, handleChange }) => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col my-4">
      <label className="mr-1 text-sm mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        className="border rounded p-1 text-sm"
        onChange={(e) => {
          setValue(e.target.value);
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
