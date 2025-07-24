import mongoose from 'mongoose';
import user from './user';

const userWalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
    accountBalance: { type: String, default: '0' },
    pendingBalance: { type: String, default: '0' },
    accountType: { type: String, default: 'customer' },
    lockAccountOnTransfer: { type: Boolean, default: true },
    isAccountLocked: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const userWallet =
  mongoose.models.userWallet || mongoose.model('userWallet', userWalletSchema);

export default userWallet;
