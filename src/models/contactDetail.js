import mongoose from 'mongoose';
import user from './user';

const contactDetailSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    city: { type: String },
    homeAddress: { type: String },
    dateOfBirth: { type: String },
    country: { type: String },
    passportPhotograph: { type: String },
    driversLicenseFront: { type: String },
    driversLicenseBack: { type: String },
  },
  {
    timestamps: true,
  }
);

const contactDetail =
  mongoose.models.contactDetail ||
  mongoose.model('contactDetail', contactDetailSchema);

export default contactDetail;
