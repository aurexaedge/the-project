import mongoose from 'mongoose';
import order from './order';
import user from './user';

const invoiceSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: order },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },

    invoiceId: { type: String },
    invoiceItems: [
      {
        service: { type: String },
        quantity: { type: Number },
        price: { type: String },
      },
    ],
    invoicePaymentTrackId: { type: String },
    invoicePaymentId: { type: String },
    invoicePaymentStatus: { type: Boolean, default: false },
    invoicePaymentAmount: { type: String },
    invoiceAmountPaidByUser: { type: String, default: '0' },

    subTotal: { type: String },
    discount: { type: String },
    grandTotal: { type: String },
  },
  {
    timestamps: true,
  }
);

const invoice =
  mongoose?.models?.invoice || mongoose?.model('invoice', invoiceSchema);

export default invoice;
