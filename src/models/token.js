import mongoose from 'mongoose';
import user from './user';

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  token: { type: String },
  purpose: { type: String },
  createdAt: { type: Date, default: Date.now() }, // 1 hour
});

const token = mongoose.models.token || mongoose.model('token', tokenSchema);

export default token;
