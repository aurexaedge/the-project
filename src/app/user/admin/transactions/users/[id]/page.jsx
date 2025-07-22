import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import SingleUser from './SingleUser';

export default function page({ params }) {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='User Details'
      //   url={`/user/admin/completed-orders`}
    >
      <SingleUser id={params?.id} />
    </HeaderLayout>
  );
}
