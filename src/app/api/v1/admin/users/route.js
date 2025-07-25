import { NextResponse } from 'next/server';
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
      phoneNumber,
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

    if (transactionPin.length !== 4) {
      return response(409, 'Transaction pin should be 4 digits');
    }

    const [existingUser, existingUsername] = await Promise.all([
      userModel.findOne({ email: email.trim() }),
      userModel.findOne({ username: username.trim() }),
    ]);

    if (existingUsername) return response(409, 'Username already exists!');
    if (existingUser) return response(409, 'Email already exists!');

    if (password !== confirmPassword)
      return response(409, 'Passwords must match');

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

    return response(200, 'Registration successful');
  } catch (error) {
    console.error('POST error:', error);
    return response(500, error.message || 'Something went wrong');
  }
};

// ✅ Get All Users
export const GET = async (req) => {
  try {
    await db.connect();

    const users = await userModel
      .find({})
      .select(
        '-firstName -lastName -updatedAt -createdAt -password -superUser -accountType -__v -phoneNumber'
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

    const { lockAccountOnTransfer, lockAccount, userId } =
      await parseRequestBody(req);

    const user = await userWalletModel.findOne({ userId });
    if (!user) return response(404, 'User wallet not found');

    user.lockAccountOnTransfer = lockAccountOnTransfer.toLowerCase() === 'yes';
    user.isAccountLocked = lockAccount.toLowerCase() === 'yes';

    await user.save();

    return response(200, 'User account updated successfully');
  } catch (error) {
    console.error('PUT error:', error);
    return response(500, error.message || 'Something went wrong');
  }
};
