import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/utils/db';
import userWalletModel from '@/models/userWallet';

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }

  try {
    await db.connect();
    const user = await userWalletModel
      .findOne({ userId: session.user._id })
      .select('-createdAt -updatedAt -password -__v -userId');

    return new NextResponse(JSON.stringify({ message: user }), {
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
