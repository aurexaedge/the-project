import mongoose from 'mongoose';
import user from './user';

const verifiedOrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    clearanceType: { type: String },
    nin: { type: String },
    title: { type: String },
    surname: { type: String },
    firstname: { type: String },
    middlename: { type: String },
    birthdate: { type: String },
    gender: { type: String },
    telephoneno: { type: String },
    residence_address: { type: String },
    residence_state: { type: String },
    residence_lga: { type: String },
    photo: { type: String },
    signature: { type: String },
    searchType: { type: String },
  },
  {
    timestamps: true,
  }
);

const verifiedOrder =
  mongoose.models.verifiedOrder ||
  mongoose.model('verifiedOrder', verifiedOrderSchema);

export default verifiedOrder;
