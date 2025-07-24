import mongoose from 'mongoose';
import user from './user';
import accountDetail from './accountDetail';

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    transactionAmount: { type: String },
    bankName: { type: String },
    transactionType: { type: String },
    transferType: { type: String },
    beneficiaryAccountName: { type: String },
    beneficiaryAccountNumber: { type: String },
    amount: { type: String },
    accountType: { type: String },
    sender: { type: String },
    transactionId: { type: String },
    remark: { type: String },
    shortDescription: { type: String }, // e.g Incoming payment to Aurexa Edge Bank | deposit or Outgoing payment to Wells Fargo | maintenance
    transactionStatus: { type: String },
    swwiftCode: { type: String },
    routingNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

const transaction =
  mongoose?.models?.transaction ||
  mongoose?.model('transaction', transactionSchema);

export default transaction;
