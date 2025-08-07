import { Validator } from "node-input-validator";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Adjust path as needed

export const changePass = async (req, res) => {
  try {


    // Step 1: Validate input
    const v = new Validator(
      req.body,
      {
        current_password: "required",
        password: "required|minLength:6",
        confirm_password: "required|same:password",
      }
    );

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

    // Step 2: Find user (from token/session - assumes req.user exists)
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Step 3: Verify current password
    const isMatch = await bcrypt.compare(req.body.current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Incorrect current password" });
    }

    // Step 4: Hash new password and update
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ status: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
