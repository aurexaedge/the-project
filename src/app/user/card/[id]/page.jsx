import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import Support from '@/components/ContactSupport/Support';

export default function page({ params }) {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Card Management'
      //   url={`/user/admin/completed-orders`}
    >
      <Support header='Apply for Card' />
    </HeaderLayout>
  );
}
