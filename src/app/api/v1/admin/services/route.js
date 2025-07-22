import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/utils/db';

import servicePriceModel from '@/models/servicePrice';
import { response } from '@/utils/handleResponse';

const adminPassword = process.env.PASSWORD;

// GET ALL SERVICES
export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return response(400, 'not authenticated');
  // }

  try {
    await db.connect();
    const ninServices = await servicePriceModel
      .find({})
      .select('-createdAt -updatedAt -__v');

    return response(200, ninServices);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};

//! POST ALL SERVICES

export const POST = async (req) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    const {
      password,
      ninModificationService,
      ninClearance,
      ninValidation,
      ninVerification,
      ninPrinting,
      trackIdPersonalisation,
      newEnrollment,
    } = await req.json();

    // if (!session || (session && !session.user.superUser)) {
    //   return response(400, 'not authenticated');
    // }
    if (password !== adminPassword) {
      return response(400, 'key incorrect');
    }

    await servicePriceModel.deleteMany({});

    const newServicePrice = new servicePriceModel({
      ninModificationService,
      ninValidation,
      ninClearance,
      ninVerification,
      ninPrinting,
      trackIdPersonalisation,
      newEnrollment,
    });

    await newServicePrice.save();

    return response(200, { status: 'sucess', newServicePrice });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'something went wrong' }),
      { status: 400 }
    );
  }
};
