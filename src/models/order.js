import mongoose from 'mongoose';
import user from './user';

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    boughtDevice: { type: String },
    deviceName: { type: String },
    issuesToFix: { type: String },
    phoneNumber: { type: String },
    pickupAddress: { type: String },
    repairType: { type: String },
    repairedBefore: { type: String },
    isDeviceDiagnoised: { type: Boolean, default: false },
    isOrderRejected: { type: Boolean, default: false },

    // deliveryPaymentDetails: {
    //   status: { type: String },
    //   amount: { type: String },
    //   paymentId: { type: String },
    // },

    deliveryPaymentStatus: { type: Boolean, default: false },
    deliveryPaymentAmount: { type: String },
    amountPaidByUser: { type: String, default: '0' },
    deliveryPaymentId: { type: String },

    isDevicedRecieved: { type: Boolean, default: false },
    isDevicedDelivered: { type: Boolean, default: false },
    receivedAt: { type: Date },
    delivereddAt: { type: Date },

    invoicePaymentStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const order = mongoose?.models?.order || mongoose?.model('order', orderSchema);

export default order;
