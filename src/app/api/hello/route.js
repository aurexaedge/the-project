import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { unstable_noStore } from 'next/cache';
import db from '@/utils/db';
import userModel from '@/models/user';
export const GET = async (req) => {
  try {
    const session = await getSession({ req });

    // unstable_noStore();

    // if (!session) {
    //   return new NextResponse(
    //     JSON.stringify({ message: 'you are not authenticated' }),
    //     { status: 400 }
    //   );
    // }

    return new NextResponse(JSON.stringify({ message: 'its runnning' }), {
      status: 200,
    });
    // const date = new Date();
    // return new NextResponse(JSON.stringify({ message: date }), {
    //   status: 200,
    // });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
