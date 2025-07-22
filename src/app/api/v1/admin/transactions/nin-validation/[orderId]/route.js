import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';

import validationOrderModel from '@/models/validationOrder';

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }
    const orderId = params.orderId;
    const validation = await validationOrderModel
      .findById(orderId)
      .populate({
        path: 'userId',
        select: 'email fullName -_id',
      })
      .select('-updatedAt -__v');

    return response(200, validation);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export const PUT = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return new NextResponse(
        JSON.stringify({ message: 'something went wrong' }),
        { status: 400 }
      );
    }

    const { message } = await req.json();
    if (!message) {
      return response(400, 'Validation error!: enter a message');
    }

    const orderId = params.orderId;
    const validation = await validationOrderModel
      .findById(orderId)
      .select('-updatedAt -__v');

    validation.isCompleted = true;
    validation.message = message;

    await validation.save();

    return response(200, 'updated successfully');
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};
