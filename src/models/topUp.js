import mongoose from 'mongoose';
import user from './user';

const topUpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    reference: { type: String },
    referenceIdForAdmin: { type: String },
    email: { type: String },
    amount: { type: String },
    paid: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    whatFor: { type: String },
    updateType: { type: String },
  },
  {
    timestamps: true,
  }
);

const topUp = mongoose?.models?.topUp || mongoose?.model('topUp', topUpSchema);

export default topUp;
