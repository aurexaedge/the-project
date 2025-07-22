'use client';
import React, { useState } from 'react';
import styles from './Transfer.module.css';
import { GoArrowDownLeft } from 'react-icons/go';
import { GoArrowUpRight } from 'react-icons/go';
import { LiaEdit } from 'react-icons/lia';
import { HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import { cutTextTo11, cutTextTo21 } from '@/utils/formatText';
import useMediaQuery from '@/hooks/useMediaQuery';

const transactionOrders = [
  {
    transactionId: '3f2a88a7-9b1e-4c0a-b5c1-7084ae1bbf30',
    remarks: 'Transfer to Michael Smith',
    date: '12th July 2025',
    transactionType: 'debit',
  },
  {
    transactionId: '3g7b70a7-9b1e-4c0a-b5c1-7084ae1bbf30',
    remarks: 'Transfer to Michael Smith',
    date: '13th May 2025',
    transactionType: 'credit',
  },
];

const TransferCard = ({ snapshot }) => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleOpenOrder = (orderId) => {
    setOpenModal(true);
    router.push(`/user/admin/transactions/transfers/${orderId}`);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className={styles.transfer_container}>
      {!snapshot && <h3>Transfer History</h3>}

      {transactionOrders?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleOpenOrder(item?.transactionId)}
            className={styles.transfer_card}
          >
            <div className={styles.left_side}>
              <span
                className={`${styles.icon_container} ${
                  item?.transactionType === 'credit'
                    ? styles.credit_icon
                    : styles.debit_icon
                }`}
              >
                <GoArrowUpRight />
              </span>
              <div className={styles.left_side_inner}>
                <p>
                  {isMobile
                    ? cutTextTo11(item?.transactionId)
                    : item?.transactionId}
                </p>
                <p>{isMobile ? cutTextTo21(item?.remarks) : item?.remarks}</p>
                <p>{item?.date}</p>
              </div>
            </div>
            <div
              className={`${styles.right_side} ${
                item?.transactionType === 'credit'
                  ? styles.credit
                  : styles.debit
              }`}
            >
              <span>+&#36;65,000</span>
              <LiaEdit color='black' />
            </div>
          </div>
        );
      })}

      {openModal && <OverLayLoader />}
    </div>
  );
};

export default TransferCard;
