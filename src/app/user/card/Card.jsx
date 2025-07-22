import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import DashMenus from '@/components/Navigations/DashMenus/DashMenus';
import { CiCreditCard1 } from 'react-icons/ci';
import { IoCardOutline } from 'react-icons/io5';

const serviceData = [
  {
    id: 1,
    title: 'Debit Card',
    url: '/user/card/debit-card',
    icon: <CiCreditCard1 size={17} />,
  },
  {
    id: 2,
    title: 'Credit Card',
    url: '/user/card/credit-card',
    icon: <IoCardOutline size={17} />,
  },
  {
    id: 3,
    title: 'Virtual Card',
    url: '/user/card/virtual-card',
    icon: <CiCreditCard1 size={17} />,
  },
];

const Card = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Card Management'
      //   url={`/user/admin/completed-orders`}
    >
      <DashMenus serviceData={serviceData} />
    </HeaderLayout>
  );
};

export default Card;
