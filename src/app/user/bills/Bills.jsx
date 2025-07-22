import React from 'react';
import styles from './Bills.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import DashMenus from '@/components/Navigations/DashMenus/DashMenus';
import { CiBank } from 'react-icons/ci';
import { LiaMoneyBillSolid } from 'react-icons/lia';
import { LuHouse } from 'react-icons/lu';
import { RiToolsLine } from 'react-icons/ri';
import { IoCarOutline } from 'react-icons/io5';
import { MdSignalWifiStatusbarConnectedNoInternet1 } from 'react-icons/md';
import { IoIosPhonePortrait } from 'react-icons/io';
import { RiHealthBookLine } from 'react-icons/ri';

const serviceData = [
  {
    id: 1,
    title: 'Mortagages',
    url: '/user/bills/mortgage',
    icon: <LiaMoneyBillSolid size={17} />,
  },
  {
    id: 2,
    title: 'Rent',
    url: '/user/bills/rent',
    icon: <LuHouse size={17} />,
  },
  {
    id: 3,
    title: 'Health Insurance',
    url: '/user/bills/health-insurance',
    icon: <RiHealthBookLine size={17} />,
  },
  {
    id: 4,
    title: 'Cable & Internet',
    url: '/user/bills/cable',
    icon: <MdSignalWifiStatusbarConnectedNoInternet1 size={17} />,
  },
  {
    id: 5,
    title: 'Utilities',
    url: '/user/bills/utilities',
    icon: <RiToolsLine size={17} />,
  },
  {
    id: 6,
    title: 'Auto Insurance',
    url: '/user/bills/auto-insurance',
    icon: <IoCarOutline size={17} />,
  },
  {
    id: 6,
    title: 'Mobile Phones',
    url: '/user/bills/phones',
    icon: <IoIosPhonePortrait size={17} />,
  },
];

const Bills = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Pay Bills'
      //   url={`/user/admin/completed-orders`}
    >
      <DashMenus serviceData={serviceData} />
    </HeaderLayout>
  );
};

export default Bills;
