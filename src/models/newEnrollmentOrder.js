import mongoose from 'mongoose';
import user from './user';

const newEnrollmentOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    enrollmentType: { type: String },
    title: { type: String },
    surname: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    gender: { type: String },
    DOB: { type: String },
    cityOfResidence: { type: String },
    stateOfResidence: { type: String },
    lgaOfResidence: { type: String },
    addressOfResidence: { type: String },
    stateOfOrigin: { type: String },
    lgaOfOrigin: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    picture: { type: String },
    isCompleted: { type: Boolean, default: false },
    amountPaid: { type: String },
    message: { type: String },
    pdfUrl: {
      type: String,
    },
    countryOfBirth: { type: String },
    guidanceFullName: { type: String },
    guidanceNin: { type: String },
    nationality: { type: String },
  },
  {
    timestamps: true,
  }
);

const newEnrollmentOrder =
  mongoose.models.newEnrollmentOrder ||
  mongoose.model('newEnrollmentOrder', newEnrollmentOrderSchema);

export default newEnrollmentOrder;
