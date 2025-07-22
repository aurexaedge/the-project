import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import newEnrollmentOrderModel from '@/models/newEnrollmentOrder';

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

    const enrollment = await newEnrollmentOrderModel
      .find({})
      .sort({ _id: -1 })
      .select('firstName surname createdAt isCompleted');

    return response(200, enrollment);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
