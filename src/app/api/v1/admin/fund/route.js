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

// ✅ POST: Accept JSON or x-www-form-urlencoded
export const POST = async (req) => {
  try {
    await db.connect();

    const contentType = req.headers.get('content-type');
    let body;

    if (contentType?.includes('application/json')) {
      body = await req.json();
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const raw = await req.text();
      const params = new URLSearchParams(raw);
      body = Object.fromEntries(params.entries());
    } else {
      return response(400, 'Unsupported content type');
    }

    const { amount, userId } = body;

    if (!amount || !userId) {
      return response(400, 'Missing required fields');
    }

    const user = await userWalletModel.findOne({ userId });
    const userData = await userModel.findById(userId);
    const userAccount = await accountDetailModel.findOne({ userId });

    if (!user || !userData || !userAccount) {
      return response(404, 'User or account details not found');
    }

    const formattedAmount = returnFormattedAmount(amount);

    const userTransaction = await transactionModel.create({
      userId,
      accountType: userAccount.accountType,
      bankName: userAccount.bankName,
      beneficiaryAccountName: userAccount.accountName,
      beneficiaryAccountNumber: userAccount.accountNumber,
      routingNumber: userAccount.routingNumber,
      amount,
      transactionType: 'Credit',
      transferType: 'Credit',
      sender: maskExceptLastThree(userAccount.accountNumber),
      transactionId: uuidv4(),
      remark: 'Deposit',
      shortDescription: `Incoming transfer to ${userAccount.accountName}`,
      transactionStatus: 'success',
    });

    user.accountBalance = Number(user.accountBalance) + Number(formattedAmount);
    await user.save();

    return response(
      200,
      `Transfer to ${userTransaction.transactionId} was successful`
    );
  } catch (error) {
    console.error('POST error:', error);
    return response(500, 'Something went wrong');
  }
};

// ✅ GET ALL TRANSACTIONS
export const GET = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }

    const fetchData = await transactionModel
      .find({})
      .sort({ _id: -1 })
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .select('-updatedAt -__v -userId');

    return new NextResponse(JSON.stringify({ message: fetchData }), {
      status: 200,
    });
  } catch (error) {
    console.error('GET error:', error);
    return response(500, 'Something went wrong');
  }
};
