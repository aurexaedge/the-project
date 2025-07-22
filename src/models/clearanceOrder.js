import mongoose from 'mongoose';
import user from './user';

const clearanceOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    clearanceType: { type: String },
    trackingId: { type: String },
    isCompleted: { type: Boolean, default: false },
    amountPaid: { type: String },
    message: { type: String },
    pdfUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const clearanceOrder =
  mongoose.models.clearanceOrder ||
  mongoose.model('clearanceOrder', clearanceOrderSchema);

export default clearanceOrder;
