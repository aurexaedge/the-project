import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import userWalletModel from '@/models/userWallet';
import userModel from '@/models/user';
import { returnFormattedAmount } from '@/utils/returnFormattedAmount';
import transactionModel from '@/models/transaction';
import accountDetailModel from '@/models/accountDetail';
import { v4 as uuidv4 } from 'uuid';

function maskExceptLastThree(value) {
  const str = String(value);
  const len = str.length;

  if (len <= 3) return str;

  const maskedPart = '*'.repeat(len - 3);
  const visiblePart = str.slice(-3);

  return maskedPart + visiblePart;
}

export const POST = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'Unathorized' }), {
        status: 400,
      });
    }

    const {
      accountType,
      bankName,
      beneficiaryAccountName,
      beneficiaryAccountNumber,
      routingNumber,
      amount,
      transactionPin,
      description,
      transactionType,
      transferType,
    } = await req.json();

    const user = await userWalletModel.findOne({ userId: session.user._id });

    const userData = await userModel.findById(session.user._id);

    const userAccount = await accountDetailModel.findOne({
      userId: session.user._id,
    });

    const formattedAmount = returnFormattedAmount(amount);

    if (Number(user.accountBalance) < Number(formattedAmount)) {
      return response(500, 'Account balance is low');
    }
    if (user.isAccountLocked) {
      return response(
        500,
        'Unauthorised activity discovered, kindly contact support to resolve issue'
      );
    }

    if (user.lockAccountOnTransfer) {
      user.isAccountLocked = true;
    }

    if (userData.transactionPin !== transactionPin) {
      return response(500, 'Incorrect transaction pin');
    }

    const userTransaction = await transactionModel.create({
      userId: session.user._id,
      accountType,
      bankName,
      beneficiaryAccountName,
      beneficiaryAccountNumber,
      routingNumber,
      amount,
      transactionPin,
      transactionType,
      transferType,
      sender: maskExceptLastThree(userAccount.accountNumber),
      transactionId: uuidv4(),
      remark: description,
      shortDescription:
        transactionType === 'Debit'
          ? `Outgoing transfer to ${beneficiaryAccountName}`
          : `Incoming transfer to ${beneficiaryAccountName}`,
      transactionStatus: 'success',
    });

    let newBalance = Number(user.accountBalance) - Number(formattedAmount);
    user.accountBalance = newBalance;

    await user.save();

    return response(200, userTransaction.transactionId);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export const GET = async (req) => {
  try {
    await db.connect();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(JSON.stringify({ message: 'Unauthorised' }), {
        status: 400,
      });
    }

    const fetchData = await transactionModel
      .find({ userId: session.user._id })
      .sort({ _id: -1 })
      .select('-updatedAt -__v -userId');

    return new NextResponse(JSON.stringify({ message: fetchData }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
