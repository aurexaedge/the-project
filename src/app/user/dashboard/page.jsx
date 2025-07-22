import React from 'react';
import Dashboard from './DashboardScreen';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import referralModel from '@/models/referral';
import userWalletModel from '@/models/userWallet';
import db from '@/utils/db';
// export const revalidate = 0; // revalidate 60s

export default async function page() {
  const session = await getServerSession(authOptions);
  await db.connect();

  const referral = await referralModel
    .findOne({ userId: session?.user?._id })
    .select('-updatedAt -createdAt -userId -_id -__v');

  const pendingBalance = await userWalletModel
    .findOne({ userId: session?.user?._id })
    .select(
      '-updatedAt -createdAt -userId -accountBalance -accountType -__v -_id'
    );

  return (
    <Dashboard
      referral={JSON.parse(JSON.stringify(referral))}
      pendingBalance={JSON.parse(JSON.stringify(pendingBalance))}
    />
  );
}
