import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user';
import db from '@/utils/db';
import userWalletModel from '@/models/userWallet';
import accountDetailModel from '@/models/accountDetail';
import { generateBankDetails } from '@/utils/generateBankDetails';
import { response } from '@/utils/handleResponse';

// ✅ Helper to parse body based on content-type
async function parseRequestBody(req) {
  const contentType = req.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return await req.json();
  }

  if (contentType?.includes('application/x-www-form-urlencoded')) {
    const raw = await req.text();
    const params = new URLSearchParams(raw);
    return Object.fromEntries(params.entries());
  }

  throw new Error('Unsupported content type');
}

// ✅ Create User
export const POST = async (req) => {
  try {
    await db.connect();
    const {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      transactionPin,
      accountType,
    } = await parseRequestBody(req);

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
      return response(409, 'Validation error');
    }

    const trimmedEmail = email.toLowerCase().trim();
    const trimmedUsername = username.toLowerCase().trim();
    const trimmedPassword = password.trim();

    if (transactionPin.length !== 4) {
      return response(409, 'Transaction pin should be 4 digits');
    }

    const [existingUser, existingUsername] = await Promise.all([
      userModel.findOne({ email: trimmedEmail }),
      userModel.findOne({ username: trimmedUsername }),
    ]);

    if (existingUsername) return response(409, 'Username already exists!');
    if (existingUser) return response(409, 'Email already exists!');

    if (password !== confirmPassword)
      return response(409, 'Passwords must match');

    const newUser = await userModel.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password: bcryptjs.hashSync(trimmedPassword),
      superUser: false,
      firstName,
      lastName,
      transactionPin,
      accountType,
    });

    await userWalletModel.create({
      userId: newUser._id,
      accountType,
    });

    const { accountNumber, routingNumber } = generateBankDetails();

    await accountDetailModel.create({
      userId: newUser._id,
      accountType,
      accountName: `${firstName} ${lastName}`,
      bankName: 'Aurexa Edge Bank',
      routingNumber,
      accountNumber,
    });
    const userDetails = {
      username: newUser.username,
      password: password,
      transactionPin: newUser.transactionPin,
    };
    return response(200, userDetails);
  } catch (error) {
    console.error('POST error:', error);
    return response(500, error.message || 'Something went wrong');
  }
};

// ✅ Get All Users
export const GET = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'Unauthorised');
    }

    const users = await userModel
      .find({})
      .sort({ _id: -1 })
      .select(
        '-firstName -lastName -updatedAt -password -superUser -accountType -__v'
      );

    return NextResponse.json({ message: users }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return response(500, error.message || 'Something went wrong');
  }
};

// ✅ Update User Lock Status
export const PUT = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }
    const { lockAccountOnTransfer, isAccountLocked, userId } =
      await parseRequestBody(req);

    const user = await userWalletModel.findOne({ userId });
    if (!user) return response(404, 'User wallet not found');

    user.lockAccountOnTransfer = lockAccountOnTransfer;
    user.isAccountLocked = isAccountLocked;

    await user.save();

    return response(200, 'User account updated successfully');
  } catch (error) {
    console.error('PUT error:', error);
    return response(500, error.message || 'Something went wrong');
  }
};
