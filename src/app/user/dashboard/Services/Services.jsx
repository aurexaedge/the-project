'use client';
import React, { useState } from 'react';
import styles from './Services.module.css';
import { FaUserCheck } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { IoIosLock } from 'react-icons/io';
import Link from 'next/link';
import { FaUserTag } from 'react-icons/fa6';
import { TbUserShield } from 'react-icons/tb';
import { LiaMoneyBillSolid } from 'react-icons/lia';
import { BiTransferAlt } from 'react-icons/bi';
import { GoCreditCard } from 'react-icons/go';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiHistogram } from 'react-icons/gi';

const serviceData = [
  {
    id: 1,
    title: 'Pay Bills',
    description: 'Settle bills instantly',
    url: '/user/bills',
    icon: <LiaMoneyBillSolid size={17} />,
    backgroundColor: '#8FD694',
  },
  {
    id: 2,
    title: 'Transfer',
    description: 'Send money fast',
    url: '/user/transfer',
    icon: <BiTransferAlt size={17} />,
    backgroundColor: '#7C6C77',
    color: '#fff',
  },
  {
    id: 3,
    title: 'Card',
    description: 'Manage your card',
    url: '/user/card',
    icon: <GoCreditCard size={17} />,
    backgroundColor: '#DAE0F2',
  },
  {
    id: 4,
    title: 'Loans',
    description: 'Apply for loans',
    url: '/user/loans',
    icon: <GiReceiveMoney size={17} />,
    backgroundColor: '#297373',
    color: '#fff',
  },
  {
    id: 5,
    title: 'Transactions',
    description: 'Track every transaction',
    url: '/user/transactions/',
    icon: <GiHistogram size={17} />,
    backgroundColor: '#FF9770',
  },
];

const Services = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenOrder = (url) => {
    setOpenModal(true);
    router.push(`${url}`);
  };
  return (
    <div className={styles.services_container}>
      <h3>Services</h3>
      <div className={styles.services_wrapper}>
        {serviceData.map((item) => {
          return (
            <Link
              href={item?.url}
              key={item?.id}
              className={styles.service_card}
              style={{
                cursor: 'pointer',
              }}
            >
              <div className={styles.upper}>
                <p>
                  <span
                    style={{
                      backgroundColor: item?.backgroundColor,
                      color: item?.color,
                      width: '40px',
                      height: '40px',
                      borderRadius: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {item?.icon}
                  </span>
                  {item?.title}
                </p>
              </div>
              <p> {item?.description}</p>
            </Link>
          );
        })}
      </div>
      {/* {openModal && <OverLayLoader />} */}
    </div>
  );
};

export default Services;
