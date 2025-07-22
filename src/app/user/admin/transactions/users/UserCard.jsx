'use client';
import React, { useState } from 'react';
import styles from './Users.module.css';
import { GoArrowDownLeft } from 'react-icons/go';
import { GoArrowUpRight } from 'react-icons/go';
import { LiaEdit } from 'react-icons/lia';
import { HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

import { CiUser } from 'react-icons/ci';

import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';

const transactionOrders = [
  {
    username: 'funnyemma11',
    email: 'jamesrily@gmail.com',
    date: '12th July 2025',
  },
  {
    username: 'isaccsmoke',
    email: 'giggiwe@yahoo.com',
    date: '13th May 2025',
  },
];

const UserCard = ({ snapshot }) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenOrder = (userId) => {
    setOpenModal(true);
    router.push(`/user/admin/transactions/users/${userId}`);
  };
  return (
    <div className={styles.transfer_container}>
      {!snapshot && <h3>Users</h3>}

      {transactionOrders?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleOpenOrder(item?.username)}
            className={styles.transfer_card}
          >
            <div className={styles.left_side}>
              <span className={styles.icon_container}>
                <CiUser />
              </span>
              <div className={styles.left_side_inner}>
                <p>{item?.username}</p>
                <p>{item?.email}</p>
                <p>{item?.date}</p>
              </div>
            </div>
            <div className={styles.right_side}>
              <LiaEdit color='rgb(5, 5, 214)' />
            </div>
          </div>
        );
      })}

      {openModal && <OverLayLoader />}
    </div>
  );
};

export default UserCard;
