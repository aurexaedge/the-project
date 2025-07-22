import mongoose from 'mongoose';
import user from './user';

const validationOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    validationType: { type: String },
    newTrackingId: { type: String },
    nin: { type: String },
    bank: { type: String },
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

const validationOrder =
  mongoose.models.validationOrder ||
  mongoose.model('validationOrder', validationOrderSchema);

export default validationOrder;
