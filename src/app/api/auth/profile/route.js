import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import userModel from '@/models/user';

export const POST = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log('session error', session);
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 400,
      });
    }

    const { phoneNumber, username } = await req.json();

    const foundUser = await userModel.findById(session.user._id);
    if (!foundUser) {
      return Response.json(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    const existingUsername = await userModel.findOne({ username: username });

    if (username === session.user.username) {
      foundUser.username = username;
      foundUser.phoneNumber = phoneNumber;
      await foundUser.save();

      return new NextResponse(
        JSON.stringify({
          message: { username: username, phoneNumber: phoneNumber },
        }),
        {
          status: 200,
        }
      );
    } else {
      if (existingUsername) {
        return new NextResponse(
          JSON.stringify({ message: 'Username already exists!' }),
          {
            status: 409,
          }
        );
      } else {
        foundUser.username = username;
        foundUser.phoneNumber = phoneNumber;
        await foundUser.save();

        return new NextResponse(
          JSON.stringify({
            message: { username: username, phoneNumber: phoneNumber },
          }),
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};
