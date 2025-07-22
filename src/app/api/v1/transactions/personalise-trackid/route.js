import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import personalisationOrderModel from '@/models/personalisationOrder';

export const GET = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }

    const personaliseData = await personalisationOrderModel
      .find({
        userId: session.user._id,
      })
      .sort({ _id: -1 })
      .select('trackingId createdAt isCompleted');

    return response(200, personaliseData);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
