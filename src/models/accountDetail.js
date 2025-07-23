import mongoose from 'mongoose';
import user from './user';

const accountDetailSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    accountName: { type: String },
    accountNumber: { type: String },
    customerEmail: { type: String },
    bankName: { type: String },
    accountType: { type: String },
    routingNumber: { type: String }, // write a code to generate 8 digit sort code mixed with caps and small letter
  },
  {
    timestamps: true,
  }
);

const accountDetail =
  mongoose.models.accountDetail ||
  mongoose.model('accountDetail', accountDetailSchema);

export default accountDetail;
