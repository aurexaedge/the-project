'use client';
import styles from '../VerifyViaNin/VerifyViaNin.module.css';
import HeaderLayout from '@/components/HeaderLayout/HeaderLayout';

import { useEffect, useRef, useState } from 'react';
import { FaHandPointRight } from 'react-icons/fa';
import { toast } from 'sonner';
import QRCode from 'react-qr-code';
import { formatDate } from '@/utils/formatDate';
import { currentDate } from '@/utils/currentDate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import useFetchData from '@/hooks/useFetchData';
import Card from '@/components/Cards/Card';
import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';

const VerifyViaPhone = () => {
  const queryClient = useQueryClient();

  const [ninValue, setNinValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [pendingItemType, setPendingItemType] = useState(null);
  const [isCardPaymentMade, setIsCardPaymentMade] = useState(false);
  const triggerDownload = useRef(null);
  const [cardDownloadType, setCardDownloadType] = useState('');

  const {
    data: serviceData,
    isError: serviceDataIsError,
    isLoading: serviceDataIsLoading,
    isPending: serviceDataIsPending,
    isFetching: serviceDataIsFetching,
  } = useFetchData({
    queryKey: ['fetchServicePrice'],
    endpoint: '/api/v1/admin/services/',
  });

  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ['fetchUnit'],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/user`);
      const data = await response.data.message;
      return data;
    },
    staleTime: 1000,
    refetchInterval: 1000 * 60,
  });
  useEffect(() => {
    if (data) {
      setUserDetails(data);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    //  //! remove this when done
    // setIsLoading(false);
    // toast.error('service is undergoing maintenance');
    // return;

    try {
      // const resData = await axios.post('/api/v1/verify-nin/v2', {
      //   ninValue,
      //   id: userDetails?._id,
      // });

      const resData = await axios.post('/api/v1/verify-nin/v3/phone', {
        ninValue,
        email: userDetails?.email,
        searchVariable: 'phone',
      });

      setResult(resData.data);
      setIsLoading(false);
      queryClient.invalidateQueries(['fetchUnit']);
    } catch (error) {
      queryClient.invalidateQueries(['fetchUnit']);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const { mutate: handlePrintSlip, isPending: PrintSlipIsPending } =
    useMutation({
      mutationFn: async (itemType) => {
        const { photo, signature, ...searchData } = result;
        setPendingItemType(itemType);
        setCardDownloadType(itemType);
        const res = await axios.post(`/api/v1/nin-services/print-cards`, {
          itemType,
          result,
        });
        return res.data;
      },

      onSuccess: async (res) => {
        toast.success(res?.message);
        queryClient.invalidateQueries(['fetchWallet']);
        setPendingItemType(null);

        setIsCardPaymentMade(true);
        //! trigger card download
        if (triggerDownload.current) {
          triggerDownload.current();
        }
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
        setPendingItemType(null);
        setCardDownloadType('');
      },
    });

  return (
    <HeaderLayout
      type='go back'
      pageHeader='Nin Verifcation'
      //   url={`/user/admin/completed-orders`}
    >
      <div className={styles.dashboard_container}>
        <div className={styles.wrapper}>
          <p className={styles.message}>
            <FaHandPointRight className={styles.info_icon} size={18} />
            You will only be charged 300 NGN per call when there is a search
            result
          </p>
          {/* <span className={styles.info}>
            - Always search twice when you have no record
          </span> */}
          <h1 className={styles.nin_header}>Search via Phone Number</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_wrapper}>
              <label htmlFor='deviceName'>
                Phone number: <br />
                <input
                  type='text'
                  name='nin'
                  placeholder='Enter phone number'
                  value={ninValue}
                  onChange={(e) => setNinValue(e.target.value)}
                />
                <br />
              </label>
            </div>
            <button
              className={styles.btn_submit}
              disabled={isLoading}
              type='submit'
            >
              {isLoading && <CircleLoader />}
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>

          {error && <p className={styles.error_wrapper}>{error}</p>}

          {result && (
            <div className={styles.btn__container}>
              {serviceData &&
                serviceData[0]?.ninPrinting?.map((item) => {
                  const isPending = pendingItemType === item?.type;
                  return (
                    <button
                      onClick={() => handlePrintSlip(item?.type)}
                      key={item?._id}
                      value={item?.type}
                      disabled={isPending}
                    >
                      {isPending && <CircleLoader />}
                      {item?.type} @&#36;{item?.price}
                    </button>
                  );
                })}
              <div
                style={{
                  height: '10px',
                  overflowY: 'scroll',
                  position: 'absolute',
                  zIndex: '-100',
                }}
              >
                <Card
                  userInfo={result}
                  cardType={cardDownloadType}
                  triggerDownload={triggerDownload}
                />
              </div>
            </div>
          )}

          {result && (
            <div className={styles.message_container}>
              <div className={styles.user_image_container}>
                <img
                  className={styles.user_image}
                  src={result?.photo}
                  alt='photo'
                />
              </div>

              <div className={styles.right_container}>
                <div className={styles.bio_data}>
                  <div className={styles.bio_inner}>
                    <p>NIN:</p>
                    <p>{result?.nin}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Title:</p>
                    <p>{result?.title}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Surname:</p>
                    <p>{result?.surname} </p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>First Name:</p>
                    <p>{result?.firstname}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Middle Name:</p>
                    <p> {result?.middlename} </p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Birth Date:</p>
                    <p>{result?.birthdate}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Gender:</p>
                    <p>{result?.gender}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Phone Number:</p>
                    <p>{result?.telephoneno}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>Address:</p>
                    <p>{result?.residence_address}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>State:</p>
                    <p>{result?.residence_state}</p>
                  </div>
                  <div className={styles.bio_inner}>
                    <p>L.G.A:</p>
                    <p>{result?.residence_lga}</p>
                  </div>
                </div>

                <div className={styles.photo_wrapper}>
                  <div className={styles.barcode_container}>
                    <QRCode
                      size={256}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                      }}
                      value={`Name: ${result?.surname} ${result?.firstname} ${
                        result?.middlename
                      } | NIN: ${result?.nin} | DOB: ${formatDate(
                        result?.birthdate
                      )} | ISS ${currentDate()}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className={styles.signature_container}>
                    <img
                      className={styles.signature_image}
                      src={result?.signature}
                      alt='signature'
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoadingData && <OverLayLoader />}
        </div>
      </div>
    </HeaderLayout>
  );
};

export default VerifyViaPhone;
