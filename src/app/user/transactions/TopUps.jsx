'use client';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import React from 'react';
import TransactionCard from './TransactionCard/TransactionCard';

const TopUps = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Transactions'
      //   url={`/user/admin/completed-orders`}
    >
      <h3 style={{ marginBottom: '20px', marginTop: '20px', opacity: '0.8' }}>
        Transaction History
      </h3>

      <TransactionCard snapshot={true} />
    </HeaderLayout>
  );
};

export default TopUps;
