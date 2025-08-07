import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  class: { type: String, required: true },
  guardian_name: { type: String, required: true },
  whatsapp_number: { type: String, required: true },
  monthly_fees: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  datetime: { type: Date, default: Date.now }
})

const Student = mongoose.model('Student', studentSchema)
export default Student
