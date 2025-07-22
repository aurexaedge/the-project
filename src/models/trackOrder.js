import mongoose from 'mongoose';
import order from './order';
import user from './user';

const trackOrderSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: order },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
    },
    trackStatus: [
      {
        title: { type: String },
        description: { type: String },
        status: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const trackOrder =
  mongoose?.models?.trackOrder ||
  mongoose?.model('trackOrder', trackOrderSchema);

export default trackOrder;
