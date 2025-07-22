import mongoose from 'mongoose';
import user from './user';

const personalisationOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    personalisationType: { type: String },
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

const personalisationOrder =
  mongoose.models.personalisationOrder ||
  mongoose.model('personalisationOrder', personalisationOrderSchema);

export default personalisationOrder;
