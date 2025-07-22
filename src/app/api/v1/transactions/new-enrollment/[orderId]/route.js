import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import newEnrollmentOrderModel from '@/models/newEnrollmentOrder';

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
    const enrollment = await newEnrollmentOrderModel
      .findById(orderId)
      .select('-updatedAt -__v');
    return response(200, enrollment);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
