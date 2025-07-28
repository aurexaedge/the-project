'use client';
import styles from './SingleUser.module.css';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { formatAmount } from '@/utils/formatAmount';
import { replaceWithBr } from '@/utils/formatText';
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import { toast } from 'sonner';
import { GoTrash } from 'react-icons/go';
import html2pdf from 'html2pdf.js';
import OverLayLoader from '@/components/Loaders/OverLayLoader/OverLayLoader';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import LoaderWithText from '@/components/Loaders/LoaderWithText/LoaderWithText';
import LogoItem from '@/components/LogoItem/LogoItem';
import CallToAction from '@/components/Buttons/CallToAction/CallToAction';

const SingleUser = ({ id }) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    severity: '',
    description: '',
    recommendation: '',
    serialNumber: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [active, setActive] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const { data, isError, isLoading, isPending, isFetching } = useQuery({
    queryKey: ['singleAdminOrder', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/admin/orders/${id}`);
      const data = await response.data.message;

      return data;
    },
    staleTime: 1000,
    refetchInterval: 1000 * 60,
  });

  const {
    data: diagnosticData,
    isError: diagnosticIsError,
    isLoading: diagnosticIsLoadin,
  } = useQuery({
    queryKey: ['singleAdminDiagnostic', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/admin/diagnostics/${id}`);
      const data = await response.data.message;
      // cll
      return data;
    },
    staleTime: 1000,
    refetchInterval: 1000 * 60,
  });

  useEffect(() => {
    if (diagnosticData) {
      setFormData({
        ...formData,
        severity: diagnosticData.severity,
        description: diagnosticData.description,
        recommendation: diagnosticData.recommendation,
        serialNumber: diagnosticData.serialNumber,
      });
      setActive(diagnosticData.severity);
    }
  }, [diagnosticData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const showPopUp = async () => {
    setShowPopup(!showPopup);
    // queryClient.invalidateQueries(['singleAdminInvoice', id]);
  };

  const handleButtonClick = (event) => {
    const value = event.target.innerText;
    setActive(value);
    setFormData({ ...formData, severity: value });
  };
  const handleSave = (event) => {
    event.preventDefault();
    setSubmittedData(formData);
  };
  const handleOpenOrder = (orderId) => {
    setOpenModal(true);
  };

  const handleDownloadReceipt = () => {
    setLoading(true);
    const element = document.querySelector('#receipt');

    const options = {
      margin: 1, // inches gives margin to the document and centers it
      filename: `Receipt_${id}.pdf`, // ✅ custom file name
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 }, // better quality
      jsPDF: {
        unit: 'in', // inches
        format: 'A4', // or 'letter', [width, height], etc.
        orientation: 'portrait', // or 'landscape'
      },
    };

    html2pdf().set(options).from(element).save();
    setTimeout(() => setLoading(false), 1000);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* <LoaderWithText /> */}
        {/* {isFetching === true && (
          <div style={{ marginBottom: '20px' }}>
            <CircleLoader />
          </div>
        )} */}
        {/* {isError && <ErrorTemplate text='orders' />} */}
        {!data && (
          <div id='receipt' className={styles.reciept_container}>
            <div className={styles.logo_container}>
              <LogoItem />
            </div>
            <h4>Transaction Receipt</h4>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Amount</p>
              <p>&#36;20,000</p>
              {/* <p>&#36;{formatAmount(data?.deliveryPaymentAmount)}</p> */}
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Type</p>
              <p>Credit</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transfer Type</p>
              <p>Inter Bank</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Date</p>
              <p>2024-09-13</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Sender</p>
              <p>***0877</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Beneficiary Account Name</p>
              <p>James Levi</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Beneficiary Account Number</p>
              <p>66536354663</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction ID</p>
              <p>3f2a88a7-9b1e-4c0a-b5c1-7084ae1bbf30</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Remark</p>
              <p>For Maintenace and Insurance</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Transaction Status</p>
              <p>Success</p>
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

        <CallToAction
          loading={loading}
          text='Download Receipt'
          progressText='Downloading...'
          action={handleDownloadReceipt}
        />
      </div>

      {/* <InvoiceModal
        id={id}
        userId={data?.userId?._id}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      /> */}
      {openModal && <OverLayLoader />}
    </div>
  );
};

export default SingleUser;
