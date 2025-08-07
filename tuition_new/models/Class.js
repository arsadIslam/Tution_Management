import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // make sure your User model exists
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Class', classSchema);
