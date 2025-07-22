import mongoose from 'mongoose';
import user from './user';

const noRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    searchParameter: { type: String },
    searchType: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const noRecord =
  mongoose.models.noRecord || mongoose.model('noRecord', noRecordSchema);

export default noRecord;
