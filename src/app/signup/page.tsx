import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useActionState } from "react";
import { IFormState, signup } from "../actions/auth";
import Form from "./form";

const SignupForm: React.FC = () => {
  return <Form />;
};

export default SignupForm;
