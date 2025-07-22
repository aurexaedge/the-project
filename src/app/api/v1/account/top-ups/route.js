import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import topUpModel from '@/models/topUp';

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

    const fetchData = await topUpModel
      .find({ userId: session.user._id })
      .sort({ _id: -1 })
      .select(
        '-referenceIdForAdmin -updatedAt -email -updateType -__v -userId'
      );

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
