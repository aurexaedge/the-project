'use client';
import React, { useState, useRef } from 'react';
import styles from './TopUpModal.module.css';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import { toast } from 'sonner';
import { BsBank2 } from 'react-icons/bs';
import useFetchData from '@/hooks/useFetchData';

const TopUpModal = ({ setShowPopup, showPopup }) => {
  const router = useRouter();

  const ref = useRef(null);

  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchAccountDetails'],
    endpoint: '/api/v1/account/',
  });

  const handleModalPopUp = () => {
    setShowPopup(!showPopup);
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleCopyReferralLink = async () => {
    setIsLinkCopied(true);
    toast.success('Account number copied');

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLinkCopied(false);
  };

  return (
    <>
      <div
        style={{
          marginTop: '0px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          // onClick={() => setShowPopup(false)}
          className={`${styles.continue_container} ${
            showPopup ? styles.active : styles.inactive
          }`}
        >
          <div ref={ref} id='paynow' className={styles.continue_wrapper}>
            <div className={styles.continue_wrapper_header}>
              <p>Bank Account</p>
              <MdOutlineCancel
                onClick={handleModalPopUp}
                className={styles.continue_cancel_icon}
              />
            </div>

            <div className={styles.nin_container}>
              {isLoadingData && <CircleLoader />}

              {data && (
                <>
                  <div className={styles.description_container}>
                    <br />
                    <span>
                      {' '}
                      <BsBank2 /> {data?.bankName}
                    </span>
                  </div>

                  <div className={styles.accountDetails}>
                    <div className={styles.account_inner}>
                      <p>Account Name:</p>
                      <p>{data?.accountName}</p>
                    </div>
                    <div className={styles.account_inner}>
                      <p>Account Number:</p>
                      <p>
                        {data?.accountNumber}

                        <CopyToClipboard
                          text={`${data?.accountNumber}`}
                          onCopy={handleCopyReferralLink}
                        >
                          <button
                            style={{
                              color: `${isLinkCopied ? 'grey' : 'inherit'}`,
                            }}
                            className={styles.btn_copy}
                          >
                            <BiCopy className={styles.copy_icon} />
                            {isLinkCopied ? 'Copied' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </p>
                    </div>
                    <div className={styles.account_inner}>
                      <p>Bank Name:</p>
                      <p>{data?.bankName}</p>
                    </div>
                    <div className={styles.account_inner}>
                      <p>Account Type:</p>
                      <p>{data?.accountType}</p>
                    </div>
                    <div className={styles.account_inner}>
                      <p>Routing Number:</p>
                      <p>{data?.routingNumber}</p>
                    </div>
                  </div>

                  <div className={styles.button_container}>
                    <button
                      onClick={handleModalPopUp}
                      className={styles.btn_close}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopUpModal;
