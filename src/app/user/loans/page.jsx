import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import Support from '@/components/ContactSupport/Support';

export default function page() {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Loans'
      //   url={`/user/admin/completed-orders`}
    >
      <Support header='Apply for Loan' />
    </HeaderLayout>
  );
}
