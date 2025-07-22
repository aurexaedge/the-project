import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    phoneNumber: { type: String, trim: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    transactionPin: { type: String },
    superUser: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const user = mongoose?.models?.user || mongoose.model('user', userSchema);

export default user;
