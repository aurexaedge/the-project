import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import InterBank from '../components/InterBank/InterBank';
import Wire from '../components/Wire/Wire';

export default function page({ params }) {
  return (
    <HeaderLayout
      type='go back'
      pageHeader={params?.id}
      //   url={`/user/admin/completed-orders`}
    >
      {params?.id === 'inter-bank-transfer' ? <InterBank /> : <Wire />}
    </HeaderLayout>
  );
}
