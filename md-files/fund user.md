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

const maskedPart = '\*'.repeat(len - 3);
const visiblePart = str.slice(-3);

return maskedPart + visiblePart;
}

export const POST = async (req) => {
try {
await db.connect();
// if (!session || (session && !session.user.superUser)) {
// return new NextResponse(
// JSON.stringify({ message: 'something went wrong' }),
// { status: 400 }
// );
// }

    const { amount, userId } = await req.json();

    const user = await userWalletModel.findOne({ userId });

    const userData = await userModel.findById(userId);

    const userAccount = await accountDetailModel.findOne({
      userId,
    });

    const formattedAmount = returnFormattedAmount(amount);

    const userTransaction = await transactionModel.create({
      userId: userId,
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

    let newBalance = Number(user.accountBalance) + Number(formattedAmount);
    user.accountBalance = newBalance;

    await user.save();

    return response(
      200,
      `Transfer to ${userTransaction.transactionId} was suuceeful`
    );

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
      .find({ userId: userId })
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
