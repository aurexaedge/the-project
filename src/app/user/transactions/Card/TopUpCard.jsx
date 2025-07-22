'use client';
import React from 'react';
import styles from './TopUp.module.css';
import Image from 'next/image';
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import formatDateTimeToGMT1 from '@/utils/dateTimeConverter';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import useFetchData from '@/hooks/useFetchData';

const TopUpCard = () => {
  const {
    data: topUpData,
    isError: topUpIsError,
    isLoading: topUpIsLoadingData,
    isPending: topUpIsPending,
  } = useFetchData({
    queryKey: ['fetchTopUpHistory'],
    endpoint: '/api/v1/account/top-ups',
  });
  return (
    <div className={styles.repair_section}>
      {topUpIsLoadingData === true && <CircleLoader />}
      {topUpData?.length === 0 && <ErrorTemplate text='orders' />}

      {topUpData?.length === 0 && (
        <div className={styles.empty_notification}>
          <div className={styles.image_container}>
            <Image
              fill
              style={{ objectFit: 'contain' }}
              alt='mobosure logo'
              src='/empty_history.svg'
              sizes='(max-width:768px) 100vw 700px'
            />
          </div>
          <p>Transaction is empty at the moment</p>
        </div>
      )}

      {topUpData?.length > 0 && (
        <div className={styles.repair_container}>
          <div className={styles.repair_wrapper}>
            {topUpData &&
              topUpData?.map((order) => {
                return (
                  <div key={order?._id} className={styles.repair_card}>
                    <p>ID: {order?._id}</p>

                    <p>Amount: &#36;{order?.amount}</p>

                    <p>{formatDateTimeToGMT1(order?.createdAt)}</p>

                    <span
                      className={`${styles.status} ${
                        order?.status === 'completed'
                          ? styles.completed
                          : styles.pending
                      }`}
                    >
                      {order?.status}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpCard;
