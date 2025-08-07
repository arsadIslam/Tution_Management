import Student from "../models/Student.js";
import Fees from "../models/Fees.js";
import { sendNotification } from '../whatsapp/sendNotification.js'
export const generateMonthlyFees = async (req, res) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth(); // 0-based index
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[monthIndex];

    // Fetch all students
    const students = await Student.find();

    if (students.length === 0) {
      return res
        .status(404)
        .json({ status: false, message: "No students found." });
    }

    let createdCount = 0;

    for (const student of students) {
      const feeExists = await Fees.findOne({
        student: student._id,
        month,
        year,
      });

      if (!feeExists) {
        const fee = new Fees({
          student: student._id,
          monthly_fees: student.monthly_fees || 0,
          is_paid: false,
          month,
          year,
        });
        await fee.save();
        sendNotification(`91${student.whatsapp_number}`, `Hi, ${student.name}\nYour fees Rs. ${student.monthly_fees} for ${month}, ${year} has been generated.\nKindly pay on time.`)
        createdCount++;
      }
    }

    res.status(200).json({
      status: true,
      message: `Fees generated for ${createdCount} student(s) for ${month} ${year}.`,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
