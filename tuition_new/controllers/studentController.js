import Student from "../models/Student.js";
import Fees from "../models/Fees.js";
import { Validator } from "node-input-validator";

export const createStudent = async (req, res) => {
  const v = new Validator(req.body, {
    name: "required|string",
    gender: "required|string",
    class: "required|string",
    guardian_name: "required|string",
    whatsapp_number: "required|string",
    monthly_fees: "required|numeric",
  });

  const matched = await v.check();

  if (!matched) {
    const firstKey = Object.keys(v.errors)[0];
    const firstError = v.errors[firstKey].message;
    return res.status(422).json({ success: false, msg: firstError });
  }

  try {
    const student = await Student.create({
      name: req.body.name,
      gender: req.body.gender,
      class: req.body.class,
      guardian_name: req.body.guardian_name,
      monthly_fees: req.body.monthly_fees,
      whatsapp_number: req.body.whatsapp_number,
      user: req.user.id,
    });

    return res.status(201).json({
      success: true,
      msg: "Student created successfully",
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const fetchStudents = async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id }).sort({
      datetime: -1,
    });

    const studentData = await Promise.all(
      students.map(async (student) => {
        const unpaidCount = await Fees.countDocuments({
          student: student._id,
          is_paid: false,
        });

        return {
          _id: student._id,
          name: student.name,
          gender: student.gender,
          class: student.class,
          guardian_name: student.guardian_name,
          whatsapp_number: student.whatsapp_number,
          datetime: student.datetime,
          unpaidMonths: unpaidCount,
        };
      })
    );

    res.json({ status: "success", data: studentData });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
