import mongoose from 'mongoose';
import user from './user';

const accountDetailsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    accountName: { type: String },
    accountNumber: { type: String },
    customerEmail: { type: String },
    bankName: { type: String },
  },
  {
    timestamps: true,
  }
);

const accountDetails =
  mongoose.models.accountDetails ||
  mongoose.model('accountDetails', accountDetailsSchema);

export default accountDetails;
