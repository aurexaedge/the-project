import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import userWalletModel from '@/models/userWallet';
import transactionModel from '@/models/transaction';

const topUpPassword = process.env.PASSWORD;

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'something went wrong');
    }

    const transactionId = params.id;

    const order = await transactionModel
      .findOne({ transactionId })
      .select('-updatedAt -__v -order -userId');

    return response(200, order);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export const POST = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    const { createdAt, beneficiaryAccountName } = await req.json();
    console.log('yess', createdAt, beneficiaryAccountName);
    const transactionId = params.id;

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'something went wrong');
    }

    const order = await transactionModel
      .findOne({ transactionId })
      .select('-updatedAt -__v');

    order.beneficiaryAccountName = beneficiaryAccountName;
    order.createdAt = new Date(createdAt);
    await order.save();

    return response(200, 'was updated!!!');
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
