import { NextResponse } from 'next/server';
import userModel from '@/models/user';
import db from '@/utils/db';
import tokenModel from '@/models/token';

import { Resend } from 'resend';
import crypto from 'crypto';
import VerificationEmail from '@/components/EmailTemplate/VerificatiionEmail';
import { generateRandomNumber } from '@/utils/generateUserName';
import generateOTP from '@/utils/generateOTP';

const RESEND_API_KEY = `${process.env.RESEND_API_KEY}`;

const resend = new Resend(RESEND_API_KEY);

export const POST = async (res) => {
  const { username, email, password, confirmPassword } = await res.json();

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

    const existingEmail = await userModel.findOne({ email: email.trim() });

    const existingUsername = await userModel.findOne({
      username: username.trim(),
    });

    if (existingUsername) {
      return new NextResponse(
        JSON.stringify({ message: 'Username already exists!' }),
        {
          status: 409,
        }
      );
    }
    if (existingEmail) {
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

    //! create token and send verification email

    let newToken = new tokenModel({
      email: email,
      token: generateOTP(),
      purpose: 'email verification',
    });
    await newToken.save();

    const savedToken = newToken.token;

    //! generate otp and send mail
    const data = await resend.emails.send({
      from: 'aurexaedge <noreply@aurexaedge.com>',
      to: email,
      subject: 'OTP For Email Verification',
      react: <VerificationEmail verificationLink={savedToken} />,
    });

    if (!data) {
      throw new Error('something went sending verification link');
    }

    //! Token creation and email verification ends here

    return new NextResponse(
      JSON.stringify({
        message: 'check inbox or spam for OTP',
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
