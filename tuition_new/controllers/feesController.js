import Fees from "../models/Fees.js";
import { Validator } from "node-input-validator";
import Student from "../models/Student.js";

export const createFees = async (req, res) => {
  try {
    const validation = new Validator();
    const rules = {
      student: "required|string",
      monthly_fees: "required|numeric",
      is_paid: "boolean",
      year: "required|integer|minLength:4|maxLength:4",
      month:"required|in:January,February,March,April,May,June,July,August,September,October,November,December",
    };

    const matched = await validation.validate(req.body, rules);
    if (matched !== true)
      return res.status(422).json({ status: false, errors: matched });

    // Check if student ID exists in Student collection
    const studentExists = await Student.findById(req.body.student);
    if (!studentExists)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });

    // Check for duplicate (student + year + month)
    const existingFee = await Fees.findOne({
      student: req.body.student,
      year: req.body.year,
      month: req.body.month,
    });

    if (existingFee)
      return res.status(409).json({
        status: false,
        message: `Fees for ${req.body.month} ${req.body.year} already exists for this student.`,
      });

    const fee = new Fees(req.body);
    await fee.save();

    res.status(201).json({
      status: true,
      message: "Fees created successfully",
      data: fee,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const fetchFees = async (req, res) => {
  try {
    const studentId = req.params.id;

    const query = studentId ? { student: studentId } : {};

    const fees = await Fees.find(query)
      .populate("student")
      .sort({ datetime: -1 });

    res.json({ status: "success", data: fees });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
export const updateFees = async (req, res) => {
  try {
    const feesid = req.params.id;

    const updatedFee = await Fees.findByIdAndUpdate(
      feesid,
      { is_paid: true },
      { new: true }
    )

    if (!updatedFee) {
      return res.status(404).json({ status: "error", message: "Fee not found" });
    }

    res.json({ status: "success", data: updatedFee });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

