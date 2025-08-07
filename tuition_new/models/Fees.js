import mongoose from "mongoose";

const feesSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  monthly_fees: {
    type: Number,
    required: true,
  },
  is_paid: {
    type: Boolean,
    default: false,
  },
  year: {
    type: Number,
    required: true,
    min: 2000,
    max: 9999,
  },
  month: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const Fees = mongoose.model("Fees", feesSchema);
export default Fees;
