'use client';
import React, { useState, useRef } from 'react';
import styles from './TopUpModal.module.css';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import useFetchData from '@/hooks/useFetchData';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopy } from 'react-icons/bi';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import { GoDotFill } from 'react-icons/go';
import { toast } from 'sonner';
import { BsBank2 } from 'react-icons/bs';

const TopUpModal = ({ setShowPopup, showPopup }) => {
  const router = useRouter();

  const ref = useRef(null);

  const handleModalPopUp = () => {
    setShowPopup(!showPopup);
    setLoading(false);
  };

  //! topup logic
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchAccountDetails'],
    endpoint: '/api/v1/account/user/create-user',
  });

  const {
    data: topUpData,
    isError: topUpIsError,
    isLoading: topUpIsLoadingData,
    isPending: topUpIsPending,
  } = useFetchData({
    queryKey: ['fetchTopUpHistory'],
    endpoint: '/api/v1/account/top-ups',
  });

  const [formDataError, setFormDataError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingCreateAccount, setLoadingCreateAccount] = useState(false);
  const [loadingPayWithCard, setLoadingPayWithCard] = useState(false);

  const [formData, setFormData] = useState({
    nin: '',
    amount: '',
    firstName: '',
    lastName: '',
  });
  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value?.trim(),
    });
  };

  const { mutate: handleCreateAccount, isPending: submitOrderIsPending } =
    useMutation({
      /*
        mutationFn: async () => {
          const res = await axios.post(
            `/api/v1/account/user/create-user`,
            formData
          );
          return res.data;
        },
        */
      mutationFn: async (endpoint) => {
        const res = await axios.post(endpoint, formData);
        return res.data;
      },

      onSuccess: async (res) => {
        setFormData({
          nin: '',
          amount: '',
          firstName: '',
          lastName: '',
        });

        if (res?.message?.isPayValidated) {
          let url = res.message.checkoutUrl;
          window.location.href = url;
          // window.open(url, '_blank');
        } else {
          toast.success(res?.message);
        }

        setFormDataError(false);
        queryClient.invalidateQueries(['fetchWallet']);
        queryClient.invalidateQueries(['fetchAccountDetails']);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },

      onSettled: () => {
        // Reset both loading states after the mutation is completed
        setLoadingCreateAccount(false);
        setLoadingPayWithCard(false);
      },
    });

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);

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
                      <BsBank2 /> Transfer To Aurexa Edge Account
                    </span>
                  </div>

                  <div className={styles.accountDetails}>
                    <div className={styles.account_inner}>
                      <p>Account Name:</p>
                      <p>
                        MFY / datafarm software solutions - {data?.accountName}
                      </p>
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
