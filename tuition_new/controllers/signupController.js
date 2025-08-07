import { Validator } from "node-input-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const v = new Validator(req.body, {
    name: "required|string|minLength:3",
    username: "required|string|minLength:4",
    mobile: "required|phoneNumber",
    email: "required|email",
    password: "required|minLength:6",
    confirm_password: "required|same:password",
  });

  const matched = await v.check();

  if (!matched) {
    // Get the first error key and message
    const firstKey = Object.keys(v.errors)[0];
    const firstError = v.errors[firstKey].message;

    return res.status(422).json({
      success: false,
      msg: firstError,
    });
  }

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email or Username already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      username: req.body.username,
      mobile: req.body.mobile,
      email: req.body.email,
      password: hashedPassword,
      datetime: req.body.datetime,
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
