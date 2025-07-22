import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import DashMenus from '@/components/Navigations/DashMenus/DashMenus';
import { CiBank } from 'react-icons/ci';
import { GiWireframeGlobe } from 'react-icons/gi';

const serviceData = [
  {
    id: 1,
    title: 'Transfer To Aurexa Edge Bank',
    url: '/user/transfer/inter-bank-transfer',
    icon: <CiBank size={17} />,
  },
  {
    id: 2,
    title: 'Internation Transfer',
    url: '/user/transfer/wire-transfer',
    icon: <GiWireframeGlobe size={17} />,
  },
];

const Transfer = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Transfer'
      //   url={`/user/admin/completed-orders`}
    >
      <DashMenus serviceData={serviceData} />
    </HeaderLayout>
  );
};

export default Transfer;
