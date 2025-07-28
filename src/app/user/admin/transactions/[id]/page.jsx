import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import SingleTransaction from './SingleTransaction';

export default function page({ params }) {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Receipt Details'
      //   url={`/user/admin/completed-orders`}
    >
      <SingleTransaction id={params?.id} />
    </HeaderLayout>
  );
}
