import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import Support from '@/components/ContactSupport/Support';

export default function page() {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Support'
      //   url={`/user/admin/completed-orders`}
    >
      <Support
        header='Reach Customer Service'
        isSupport={true}
        text='For any complain or enquiry, kindly reach out to our support line'
      />
    </HeaderLayout>
  );
}
