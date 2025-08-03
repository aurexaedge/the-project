import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user';
import db from '@/utils/db';

export const POST = async (res) => {
  const { email, password } = await res.json();

  if (!email || !password) {
    return new NextResponse(JSON.stringify({ message: 'Validation error' }), {
      status: 409,
    });
  }

  const trimmedEmail = email.toLowerCase().trim();
  const trimmedPassword = password.trim();
  try {
    await db.connect();

    const user = await userModel.findOne({
      $or: [
        { email: trimmedEmail }, // Search by email
        { username: trimmedEmail }, // Search by username
      ],
    });

    if (!user) {
      throw new Error('Invalid username or password!');
    }
    const comparePassword = await bcryptjs.compare(
      trimmedPassword,
      user.password
    );

    if (!comparePassword) {
      throw new Error('Invalid username or password');
    }

    return new NextResponse(
      JSON.stringify({
        message: 'successful',
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
