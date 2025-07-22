import { NextResponse } from 'next/server';
import userModel from '@/models/user';
import db from '@/utils/db';
import tokenModel from '@/models/token';

import { Resend } from 'resend';
import generateOTP from '@/utils/generateOTP';
import VerificationEmail from '@/components/EmailTemplate/VerificatiionEmail';
import { v4 as uuidv4 } from 'uuid';

const RESEND_API_KEY = `${process.env.RESEND_API_KEY}`;
const resend = new Resend(RESEND_API_KEY);

//! @@ Resend OTP For onboarding
export const POST = async (res) => {
  try {
    await db.connect();
    const { email, token } = await res.json();

    if (!email || !email.includes('@')) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong with email' }),
        {
          status: 409,
        }
      );
    }

    let newToken = new tokenModel({
      email: email,
      token: generateOTP(),
      purpose: 'email verification',
    });
    await newToken.save();

    const savedToken = newToken.token;

    const data = await resend.emails.send({
      from: 'aurexaedge <noreply@aurexaedge.com>',
      to: email,
      subject: 'OTP For Email Verification',
      react: <VerificationEmail verificationLink={savedToken} />,
    });
    if (!data) {
      console.log('dataaa', data);
      throw new Error('something went sending verification link');
    }

    return new NextResponse(
      JSON.stringify({
        message: 'OTP sent, check inbox or spam for OTP',
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
