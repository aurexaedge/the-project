import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import accountDetailModel from '@/models/accountDetail';

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

    const fetchData = await accountDetailModel
      .findOne({ userId: session.user._id })
      .select('-updatedAt -createdAt -__v');

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
