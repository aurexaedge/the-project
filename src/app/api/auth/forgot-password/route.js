import { NextResponse } from 'next/server';
import userModel from '@/models/user';
import db from '@/utils/db';
import tokenModel from '@/models/token';

import { Resend } from 'resend';
import ForgotPasswordEmail from '@/components/EmailTemplate/ForgotPasswordEmail';
import crypto from 'crypto';
import bcryptjs from 'bcryptjs';

const RESEND_API_KEY = `${process.env.RESEND_API_KEY}`;

const resend = new Resend(RESEND_API_KEY);

export const POST = async (res) => {
  const { email } = await res.json();

  if (!email || !email.includes('@')) {
    return new NextResponse(JSON.stringify({ message: 'Validation error' }), {
      status: 409,
    });
  }
  try {
    await db.connect();

    const existingEmail = await userModel.findOne({ email: email.trim() });

    if (!existingEmail) {
      return new NextResponse(
        JSON.stringify({ message: 'Email does not exists!' }),
        {
          status: 409,
        }
      );
    }

    //! create token and send verification email
    let newToken = new tokenModel({
      email: email,
      token: crypto.randomBytes(32).toString('hex'),
      purpose: 'forgot password',
    });
    await newToken.save();

    const url = `https://www.aurexaedge.com/auth/forgot-password/reset?userid=${existingEmail._id}&token=${newToken.token}`;

    //! generate otp and send mail
    const data = await resend.emails.send({
      from: 'aurexaedge <noreply@aurexaedge.com>',
      to: email,
      subject: 'Password Reset Link',
      react: <ForgotPasswordEmail verificationLink={url} />,
    });

    if (!data) {
      console.log('dataaa', data);
      return new NextResponse(
        JSON.stringify({
          message: 'something went wrong sending password link',
        }),
        {
          status: 500,
        }
      );
    }

    //! Token creation and email verification ends here
    return new NextResponse(
      JSON.stringify({
        message: 'check inbox or spam for password reset link',
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

//! @@ Password reset
export const PUT = async (res) => {
  try {
    await db.connect();

    const { userid, token, password } = await res.json();

    const user = await userModel.findOne({ _id: userid });

    if (!userid || !token || !password)
      return new NextResponse(
        JSON.stringify({ message: 'validation erro: token or id not present' }),
        {
          status: 400,
        }
      );

    if (!user)
      return new NextResponse(
        JSON.stringify({ message: 'user does not exist' }),
        {
          status: 409,
        }
      );

    const foundToken = await tokenModel.findOne({
      email: user.email,
      purpose: 'forgot password',
      token: token,
    });

    if (!foundToken) {
      return new NextResponse(
        JSON.stringify({ message: 'token is not valid' }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcryptjs.hashSync(password);

    user.password = hashedPassword;

    const savedUser = await user.save();

    if (savedUser) {
      await tokenModel.deleteMany({
        email: user.email,
        purpose: 'forgot password',
      });

      return new NextResponse(
        JSON.stringify({
          message: 'Password reset successfully',
        }),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: 'Failed to save the user' }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};
