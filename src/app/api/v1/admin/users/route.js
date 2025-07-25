import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user';
import db from '@/utils/db';
import userWalletModel from '@/models/userWallet';
import accountDetailModel from '@/models/accountDetail';

import { generateBankDetails } from '@/utils/generateBankDetails';

//! create user
export const POST = async (res) => {
  const {
    username,
    phoneNumber,
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    transactionPin,
    accountType,
  } = await res.json();

  if (
    !username ||
    !email ||
    !email.includes('@') ||
    !password ||
    !firstName ||
    !lastName ||
    !transactionPin ||
    !accountType ||
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
      firstName,
      lastName,
      transactionPin,
      accountType,
    });

    //!create wallet balance
    await userWalletModel.create({
      userId: newUser?._id,
      accountType,
    });

    //! create account details
    const { accountNumber, routingNumber } = generateBankDetails();
    await accountDetailModel.create({
      userId: newUser?._id,
      accountType,
      accountName: `${firstName} ${lastName}`,
      bankName: 'Aurexa Edge Bank',
      routingNumber,
      accountNumber,
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
