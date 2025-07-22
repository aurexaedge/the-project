import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import userWalletModel from '@/models/userWallet';

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

    const users = await userWalletModel
      .find({})
      .sort({ _id: -1 })
      .populate({
        path: 'userId',
        select: 'email fullName -_id',
      })
      .select('-accountType -updatedAt -__v');

    return response(200, users);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
