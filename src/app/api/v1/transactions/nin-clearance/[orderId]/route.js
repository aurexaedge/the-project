import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import clearanceOrderModel from '@/models/clearanceOrder';

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }

    const orderId = params.orderId;
    const clearance = await clearanceOrderModel
      .findById(orderId)
      .select('-updatedAt -__v');

    return response(200, clearance);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
