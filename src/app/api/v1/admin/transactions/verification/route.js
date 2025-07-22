import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import verifiedOrderModel from '@/models/verifiedOrder';

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

    const verifiedOrder = await verifiedOrderModel
      .find({})
      .sort({ _id: -1 })
      .select('nin createdAt');

    return response(200, verifiedOrder);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
