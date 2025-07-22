import { NextResponse } from 'next/server';
import db from '@/utils/db';
import userModel from '@/models/user';
import userWalletModel from '@/models/userWallet';
import { response as sendResponse } from '@/utils/handleResponse';
import verifiedOrderModel from '@/models/verifiedOrder';

import { ninSearchPrice } from '@/utils/data/servicePrice';

export const GET = async (req) => {
  try {
    await db.connect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('userid');


    const user = await userModel
      .findById(id)
      .select('-createdAt -updatedAt -password -__v -userId');

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'verification error!- kindly refresh page' }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(JSON.stringify({ message: user }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};

//!@@ verify user and check wallet balance
export const PUT = async (req) => {
  try {
    await db.connect();
    const { id, email } = await req.json();

    const user = await userModel
      .findById(id)
      .select('-createdAt -updatedAt -password -__v -userId');

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'verification error! - user' }),
        {
          status: 400,
        }
      );
    }

    if (user.email !== email) {
      return new NextResponse(
        JSON.stringify({ message: 'verification error! - user' }),
        {
          status: 400,
        }
      );
    }

    //! VERIFY IF USER BALANCE IS ENOUGH
    const wallet = await userWalletModel.findOne({ userId: id });
    const walletBalance = Number(wallet.accountBalance);

    if (walletBalance < Number(ninSearchPrice)) {
      return sendResponse(500, 'your wallet balance is low');
    }

    return new NextResponse(JSON.stringify({ message: 'was successful' }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};

//! VERYIFY USER THEN DEDUCT
export const POST = async (req) => {
  try {
    await db.connect();

    const { id, ninDetails } = await req.json();

    //! VERIFY IF USER BALANCE IS ENOUGH
    const wallet = await userWalletModel.findOne({ userId: id });
    const walletBalance = Number(wallet.accountBalance);

    if (walletBalance < Number(ninSearchPrice)) {
      return sendResponse(500, 'your wallet balance is low');
    }

    //! DEBIT WALLET
    const charge = walletBalance - Number(ninSearchPrice);
    wallet.accountBalance = charge;
    await wallet.save();
    //! ENDS HERE

    //! add record to database

    await verifiedOrderModel.create({
      ...ninDetails,
      photo: ninDetails.photo,
      userId: id,
      searchType: 'Search record via Nin',
    });

    return new NextResponse(
      JSON.stringify({ message: 'user debit was successful' }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
