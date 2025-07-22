import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user';
import db from '@/utils/db';
import userWalletModel from '@/models/userWallet';
import tokenModel from '@/models/token';

import { Resend } from 'resend';
import crypto from 'crypto';
import { generateRandomNumber } from '@/utils/generateUserName';
import { v4 as uuidv4 } from 'uuid';

const RESEND_API_KEY = `${process.env.RESEND_API_KEY}`;
const resend = new Resend(RESEND_API_KEY);

export const POST = async (res) => {
  const { username, phoneNumber, email, password, confirmPassword, token } =
    await res.json();

  //   return new NextResponse(JSON.stringify({ message: uuidv4() }), {
  //     status: 200,
  //   });

  console.log({
    username,
    phoneNumber,
    email,
    password,
    confirmPassword,
    token,
  });

  if (
    !username ||
    !email ||
    !email.includes('@') ||
    !password ||
    !confirmPassword
  ) {
    return new NextResponse(JSON.stringify({ message: 'Validation error' }), {
      status: 409,
    });
  }

  try {
    await db.connect();

    const existingUser = await userModel.findOne({ email: email.trim() });

    const existingUsername = await userModel.findOne({
      username: username.trim(),
    });

    const foundToken = await tokenModel.findOne({
      email: email,
      purpose: 'email verification',
      token: token,
    });

    if (!foundToken) {
      return new NextResponse(
        JSON.stringify({ message: 'token has expired or invalid' }),
        {
          status: 409,
        }
      );
    }

    // return new NextResponse(JSON.stringify({ message: 'successful' }), {
    //   status: 200,
    // });

    if (existingUsername) {
      return new NextResponse(
        JSON.stringify({ message: 'Username already exists!' }),
        {
          status: 409,
        }
      );
    }

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: 'Email already exists!' }),
        {
          status: 409,
        }
      );
    }

    if (password !== confirmPassword) {
      return new NextResponse(
        JSON.stringify({ message: 'Passwords must match' }),
        {
          status: 409,
        }
      );
    }

    const newUser = await userModel.create({
      username,
      phoneNumber,
      email,
      password: bcryptjs.hashSync(password),
      superUser: false,
    });

    if (newUser) {
      await tokenModel.deleteMany({
        email: email,
        purpose: 'email verification',
      });
    }

    //!create wallet balance
    await userWalletModel.create({
      userId: newUser?._id,
    });

    return new NextResponse(
      JSON.stringify({
        message: 'registration successful',
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log('err', error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
