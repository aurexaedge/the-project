import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';
import { cloudinary } from '@/utils/cloudinary';

import modificationOrderModel from '@/models/modificationOrder';
import { MessageContextImpl } from 'twilio/lib/rest/ipMessaging/v1/service/channel/message';

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
    const modification = await modificationOrderModel
      .findById(orderId)
      .populate({
        path: 'userId',
        select: 'email fullName -_id',
      })
      .select('-updatedAt -__v');

    return response(200, modification);
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

    const { file, message } = await req.json();

    // return response(200, 'completed');
    if (!file) {
      return response(400, 'Validation error!: kindly upload a file');
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: process.env.CLOUDINARY_PRESET_NAME,
      resource_type: 'raw',
    });

    if (!uploadResponse) {
      return response(400, 'something went wrong uploading document');
    }

    const pdfUrl = uploadResponse.secure_url;

    const orderId = params.orderId;
    const modification = await modificationOrderModel
      .findById(orderId)
      .select('-updatedAt -__v');

    modification.isCompleted = true;
    modification.pdfUrl = pdfUrl;
    modification.message = message;
    await modification.save();

    return response(200, 'updated successfully');
  } catch (error) {
    console.log(error);
    return response(500, error.message);
  }
};
