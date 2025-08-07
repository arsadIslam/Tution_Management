import Class from '../models/Class.js';
import { Validator } from "node-input-validator";

// 📌 Create a new class
export const createClass = async (req, res) => {
  try {
    const v = new Validator(req.body, {
      class_name: "required"
    });

    const matched = await v.check()

  if (!matched) {
    const firstKey = Object.keys(v.errors)[0]
    const firstError = v.errors[firstKey].message
    return res.status(422).json({ success: false, msg: firstError })
  }
    // Check if class alredy exists
    const existingClass = await Class.findOne({
      class_name: req.body.class_name,
      user_id: req.user.id, 
    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        msg: "Class already exists!",
      });
    }

    const { class_name } = req.body;

    const newClass = new Class({
      class_name,
      user_id: req.user.id, // assuming user is added to req by auth middleware
    });

    const saved = await newClass.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};


// 📌 Get all classes for a user
export const getallClasses = async (req, res) => {
  try {
    const classes = await Class.find({ user_id: req.user.id }).sort({ datetime: -1 });
    res.json({ success: true, data: classes });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.msg });
  }
};

