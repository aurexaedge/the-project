import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import userWalletModel from '@/models/userWallet';

const topUpPassword = process.env.PASSWORD;

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }

    const userId = params.userId;
    const user = await userWalletModel
      .findById(userId)
      .populate({
        path: 'userId',
        select: 'email fullName -_id',
      })
      .select('-updatedAt -__v');

    return response(200, user);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export const PUT = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    const { amount, password, operation } = await req.json();

    const userId = params.userId;

    //!validation props
    const requiredFields = [amount, password, operation, userId];

    //! validate field
    if (requiredFields.some((field) => !field || field.length === 0)) {
      return response(400, 'Validation error: please enter all fields');
    }

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'something went wrong');
    }

    const user = await userWalletModel
      .findById(userId)
      .select('-updatedAt -__v');

    if (password !== topUpPassword) {
      return response(400, 'incorrect password');
    }

    if (operation === 'Credit wallet') {
      let newBalance = Number(user.accountBalance) + Number(amount);

      user.accountBalance = newBalance;
    } else {
      let newBalance = Number(user.accountBalance) - Number(amount);
      user.accountBalance = newBalance;
    }

    await user.save();

    return response(200, 'acccount updated successfully');
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
