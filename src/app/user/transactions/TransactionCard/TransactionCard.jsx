'use client';
import React, { useState } from 'react';
import styles from './TransactionCard.module.css';
import { GoArrowDownLeft } from 'react-icons/go';
import { GoArrowUpRight } from 'react-icons/go';
import { LiaEdit } from 'react-icons/lia';
import { HiDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import { cutTextTo11, cutTextTo21 } from '@/utils/formatText';
import useMediaQuery from '@/hooks/useMediaQuery';
import { useSession } from 'next-auth/react';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import EmptyOder from '@/components/EmptyOrderTemplate/EmptyOder';
import formatDateTimeToLocal from '@/utils/formatDateToLocal';
import { formatAmount } from '@/utils/formatAmount';

const TransactionCard = ({ snapshot }) => {
  const router = useRouter();
  const { status, data: session } = useSession();

  const [openModal, setOpenModal] = useState(false);

  const { data, isError, isLoading, isPending, isFetching } = useFetchData({
    queryKey: ['fetchTransaction'],
    endpoint: '/api/v1/transaction/',
  });

  const handleOpenOrder = (transactionId) => {
    // if (!session?.user) {
    //   router.refresh();
    //   return;
    // }
    setOpenModal(true);
    router.push(`/user/transactions/${transactionId}`);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <div className={styles.transfer_container}>
      {!snapshot && <h3>Transaction History</h3>}

      {isLoading === true && <CircleLoader />}
      {isError && <ErrorTemplate text='Transaction' />}

      {data?.length === 0 && <EmptyOder text='No transactions at the moment' />}

      {data?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => handleOpenOrder(item?.transactionId)}
            className={styles.transfer_card}
          >
            <div className={styles.left_side}>
              <span
                className={`${styles.icon_container} ${
                  item?.transactionType === 'Credit'
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
                <p>
                  {isMobile
                    ? cutTextTo21(item?.shortDescription)
                    : item?.shortDescription}
                </p>
                <p>{formatDateTimeToLocal(item?.createdAt)}</p>
              </div>
            </div>
            <div
              className={`${styles.right_side} ${
                item?.transactionType === 'Credit'
                  ? styles.credit
                  : styles.debit
              }`}
            >
              <span>
                {item?.transactionType === 'Credit' ? '+' : '-'}&#36;
                {/* {formatAmount(item?.amount)} */}
                {formatAmount(item?.amount)}
              </span>
              <LiaEdit color='black' />
            </div>
          </div>
        );
      })}

      {openModal && <OverLayLoader />}
    </div>
  );
};

export default TransactionCard;
