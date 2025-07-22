import mongoose from 'mongoose';
import order from './order';
import user from './user';

const rejectionMessageSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: order },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },

    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const rejectionMessage =
  mongoose?.models?.rejectionMessage ||
  mongoose?.model('rejectionMessage', rejectionMessageSchema);

export default rejectionMessage;
