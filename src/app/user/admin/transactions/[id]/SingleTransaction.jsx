'use client';
import styles from './SingleTransaction.module.css';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatAmount } from '@/utils/formatAmount';
import { replaceWithBr } from '@/utils/formatText';
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import { toast } from 'sonner';
import { GoTrash } from 'react-icons/go';
import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';
import LogoItem from '@/components/LogoItem/LogoItem';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';
import formatDateTimeToLocal from '@/utils/formatDateToLocal';
import { LiaEdit } from 'react-icons/lia';
import EditTimeModal from '../../components/EditTimeModal/EditTimeModal';

const SingleTransaction = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['singleTransactionOrder', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/admin/fund/${id}`);
      const data = response.data.message;
      return data;
    },

    staleTime: 1000,
    refetchInterval: 1000 * 60,
  });

  const handleDownloadReceipt = async () => {
    setLoading(true);
    const element = document.querySelector('#receipt');

    if (!element) {
      toast.error('Receipt element not found.');
      setLoading(false);
      return;
    }

    const options = {
      margin: 1,
      filename: `Receipt_${id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'in',
        format: 'A4',
        orientation: 'portrait',
      },
    };

    // Dynamically import html2pdf.js only on client-side
    const html2pdf = (await import('html2pdf.js')).default;

    html2pdf().set(options).from(element).save();

    setTimeout(() => setLoading(false), 1000);
  };
  const [showPopup, setShowPopup] = useState(false);

  const showPopUp = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <LoaderWithText /> */}
        {isLoading === true && (
          <div style={{ marginBottom: '20px' }}>
            <CircleLoader />
          </div>
        )}
        {isError && <ErrorTemplate text='Transactions' />}
        {data && (
          <div id='receipt' className={styles.receipt_container}>
            <button
              data-html2canvas-ignore
              onClick={showPopUp}
              className={styles.edit_button}
            >
              Edit
              <LiaEdit color='black' />
            </button>
            <div className={styles.logo_container}>
              <LogoItem />
            </div>
            <h4>Transaction Receipt</h4>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Amount</p>
              <p>&#36;{formatAmount(data?.amount)}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Type</p>
              <p>{data?.transactionType}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transfer Type</p>
              <p>{data?.transferType}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Date</p>
              <p>{formatDateTimeToLocal(data?.transactionDate)}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Sender</p>
              <p>{data?.sender}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Beneficiary Account Name</p>
              <p>{data?.beneficiaryAccountName}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Beneficiary Account Number</p>
              <p>{data?.beneficiaryAccountNumber}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction ID</p>
              <p>{data?.transactionId}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Remark</p>
              <p>{data?.remark}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Status</p>
              <p>{data?.transactionStatus}</p>
            </div>
            <p
              style={{
                fontSize: '10px',
                letterSpacing: '0.08em',
                marginTop: '30px',
              }}
            >
              This receipt was generated by Aurexa Edge Bank, For further
              inquiries, contact support at{' '}
              <span style={{ color: 'blue' }}>support@aurexaedge.com</span>
            </p>
          </div>
        )}
        {data && (
          <CallToAction
            loading={loading}
            text='Download Receipt'
            progressText='Downloading...'
            action={handleDownloadReceipt}
          />
        )}
      </div>

      {openModal && <OverLayLoader />}
      <EditTimeModal
        data={data}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        isLoading={isLoading}
        id={id}
      />
    </div>
  );
};

export default SingleTransaction;
