'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { BsFillWalletFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Services from './Services/Services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatAmount } from '@/utils/formatAmount';
import useFetchData from '@/hooks/useFetchData';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import { IoMdAddCircle } from 'react-icons/io';
import TopUpModal from './TopUpComponent/TopUpModal';
import { CiBank } from 'react-icons/ci';
import Link from 'next/link';
import { MdLock } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import TransferCard from '../admin/transactions/transfers/TransferCard';

const DashboardScreen = ({ referral }) => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { status, data: session } = useSession();

  const { asPath, pathname } = useRouter();

  const ref = useRef(null);

  const searchParams = useSearchParams();

  const reference = searchParams.get('reference');

  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchWallet'],
    endpoint: '/api/v1/wallet/',
  });

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyReferralLink = async () => {
    setIsLinkCopied(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLinkCopied(false);
  };

  const [isAccountCreated, setIsAccountCreated] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const showPopUp = () => {
    setShowPopup(!showPopup);
  };

  return (
    <main>
      <div className={styles.heading_container}>
        <h2 className={styles.heading}>
          Welcome,
          {session?.user && (
            <span
              style={{
                background: 'linear-gradient(90deg,#4ca5ff,#b573f8)',
                padding: '0px 10px',
                borderRadius: '8px',
              }}
            >
              {session?.user?.firstName} {session?.user?.lastName}
            </span>
          )}
        </h2>

        <div className={styles.account_status}>
          <p>Account Status:</p>
          {data && (
            <p
              className={
                data?.isAccountLocked
                  ? styles.disabled_acount
                  : styles.active_acount
              }
            >
              {data?.isAccountLocked ? (
                <MdLock />
              ) : (
                <IoIosCheckmarkCircleOutline />
              )}
              {data?.isAccountLocked ? 'Disabled' : 'Active'}
            </p>
          )}
        </div>
      </div>

      <div className={styles.section_a}>
        <div className={styles.inner_a}>
          <div className={styles.inner_sub}>
            <div className={styles.wallet_logo_container}>
              <FaWallet className={styles.wallect_balance_icons} />
            </div>
            <div className={styles.wallet_balance}>
              <p>Available Balance</p>
              <p
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <>&#36;{formatAmount(data?.accountBalance)}</>{' '}
              </p>
            </div>
          </div>
          <div className={styles.inner_sub}>
            <div className={styles.wallet_logo_container}>
              <BsFillWalletFill className={styles.wallect_balance_icons} />
            </div>
            <div className={styles.wallet_balance}>
              <p>Pending Balance</p>
              <p
                style={{
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &#36;{formatAmount(data?.pendingBalance)}
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.inner_c} ${styles.topUp_container}`}>
          <div className={styles.TopUp}>
            <p>Quick access</p>
            <button
              onClick={showPopUp}
              className={`${styles.btn_fund} ${styles.btn_add_cash}`}
            >
              Add Cash <IoMdAddCircle className={styles.topUp_icon} />
            </button>

            <Link
              href='/user/transfer'
              style={{ marginLeft: '20px' }}
              className={styles.btn_fund}
            >
              Send Money <CiBank className={styles.topUp_icon} />
            </Link>
          </div>
          <TopUpModal
            data={data}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </div>

        <div className={styles.services_wrapper}>
          <Services />
        </div>
        <div className={styles.inner_b}>
          <div className={styles.transaction_heading}>
            <p> Transactions</p>
            <Link
              style={{ fontSize: '13px', textDecoration: 'underline' }}
              href='/user/transactions'
            >
              View all
            </Link>
          </div>
          <TransferCard snapshot={true} />
        </div>
      </div>
    </main>
  );
};

export default DashboardScreen;
