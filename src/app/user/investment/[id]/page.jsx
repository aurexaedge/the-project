import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import Support from '@/components/ContactSupport/Support';

export default function page({ params }) {
  return (
    <HeaderLayout
      type='go back'
      pageHeader={params.id}
      //   url={`/user/admin/completed-orders`}
    >
      <Support
      // header='Apply for Card'
      />
    </HeaderLayout>
  );
}
