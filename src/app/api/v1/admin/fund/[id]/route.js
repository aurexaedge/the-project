import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import db from '@/utils/db';
import { response } from '@/utils/handleResponse';
import transactionModel from '@/models/transaction';

function getRandomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date;
}

export const GET = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'something went wrong');
    }

    const transactionId = params.id;

    const order = await transactionModel
      .findOne({ transactionId })
      .select('-updatedAt -__v -order -userId');

    return response(200, order);
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export const POST = async (req, { params }) => {
  try {
    await db.connect();
    const session = await getServerSession(authOptions);

    const { transactionDate, beneficiaryAccountName } = await req.json();
    const transactionId = params.id;

    if (!session || (session && !session.user.superUser)) {
      return response(400, 'something went wrong');
    }

    const order = await transactionModel
      .findOne({ transactionId })
      .select('-updatedAt -__v');

    order.beneficiaryAccountName = beneficiaryAccountName;
    order.transactionDate = new Date(transactionDate);
    await order.save();

    return response(200, 'was updated!!!');
  } catch (error) {
    console.log(error);
    return response(500, 'something went wrong');
  }
};

export async function PUT() {
  try {
    await db.connect();

    const start = new Date('2024-07-25T00:00:00Z');
    const end = new Date('2024-07-26T23:59:59Z');

    // 1. Fetch and sort by _id (or any stable field)
    const allTransactions = await transactionModel.find({}).sort({ _id: 1 });

    if (allTransactions.length === 0) {
      return new Response(JSON.stringify({ message: 'No documents found' }), {
        status: 404,
      });
    }

    // 2. Generate random dates for each document
    let randomDates = allTransactions.map(() => getRandomDate(start, end));

    // 3. Sort random dates to make them ascending
    randomDates.sort((a, b) => a - b);

    // 4. Assign them in order
    for (let i = 0; i < allTransactions.length; i++) {
      allTransactions[i].customDate = randomDates[i];
      await allTransactions[i].save();
    }

    return new Response(
      JSON.stringify({
        message: 'Documents updated with ascending random dates',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Error updating documents', error }),
      { status: 500 }
    );
  }
}
