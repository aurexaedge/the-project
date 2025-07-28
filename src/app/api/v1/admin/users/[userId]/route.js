import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import userWalletModel from '@/models/userWallet';

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    // if (!session || (session && !session.user.superUser)) {
    //   return new NextResponse(
    //     JSON.stringify({ message: 'something went wrong' }),
    //     { status: 400 }
    //   );
    // }

    const userId = params.userId;
    const user = await userWalletModel
      .findOne({ userId })
      .populate({
        path: 'userId',
        select: 'username -_id',
      })
      .select('-updatedAt -__v -createdAt -pendingBalance');

    return response(200, user);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong2');
  }
};
