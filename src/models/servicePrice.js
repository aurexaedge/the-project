import mongoose from 'mongoose';

const servicePriceSchema = new mongoose.Schema(
  {
    ninModificationService: [
      {
        type: { type: String },
        price: { type: String },
        duration: { type: String },
      },
    ],
    ninValidation: [
      {
        type: { type: String },
        price: { type: String },
        duration: { type: String },
      },
    ],
    ninClearance: [
      {
        type: { type: String },
        price: { type: String },
        duration: { type: String },
      },
    ],
    trackIdPersonalisation: [
      {
        type: { type: String },
        price: { type: String },
        duration: { type: String },
      },
    ],
    newEnrollment: [
      {
        type: { type: String },
        price: { type: String },
        duration: { type: String },
      },
    ],
    ninVerification: [
      {
        type: { type: String },
        price: { type: String },
      },
    ],
    ninPrinting: [
      {
        type: { type: String },
        price: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const servicePrice =
  mongoose?.models?.servicePrice ||
  mongoose?.model('servicePrice', servicePriceSchema);

export default servicePrice;
