'use client';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import React from 'react';
import TopUpCard from './Card/TopUpCard';

const TopUps = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Transactions'
      //   url={`/user/admin/completed-orders`}
    >
      <TopUpCard />
    </HeaderLayout>
  );
};

export default TopUps;
