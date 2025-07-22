import React from 'react';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';
import DashMenus from '@/components/Navigations/DashMenus/DashMenus';

import { LuHouse } from 'react-icons/lu';
import { RiAmazonLine } from 'react-icons/ri';
import { BiCandles } from 'react-icons/bi';
import { MdOutlineToys } from 'react-icons/md';
const serviceData = [
  {
    id: 1,
    title: 'Real Estate Investment',
    url: '/user/investment/real-estate',
    icon: <LuHouse size={17} />,
  },
  {
    id: 2,
    title: 'Stocks',
    url: '/user/investment/stocks',
    icon: <RiAmazonLine size={17} />,
  },
  {
    id: 3,
    title: 'Crypto/Forex Investment',
    url: '/user/investment/crypto-investment',
    icon: <BiCandles size={17} />,
  },
  {
    id: 4,
    title: 'NFT Investment',
    url: '/user/investment/nft-investment',
    icon: <MdOutlineToys size={17} />,
  },
];

const Card = () => {
  return (
    <HeaderLayout
      type='go back'
      pageHeader='Investment'
      //   url={`/user/admin/completed-orders`}
    >
      <DashMenus serviceData={serviceData} />
    </HeaderLayout>
  );
};

export default Card;
