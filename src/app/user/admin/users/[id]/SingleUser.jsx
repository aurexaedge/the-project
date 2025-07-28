'use client';
import styles from './SingleUser.module.css';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
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

  const [selectedAction, setSelectedAction] = useState('');

  const handleOperationChange = (e) => {
    setSelectedAction(e.target.value);
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
          <div className={styles.reciept_container}>
            <h4 className={styles.header}>User Account Information</h4>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Username:</p>
              <p>kekus maximus</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Account Balance</p>
              <p>&#36;20,000</p>
              {/* <p>&#36;{formatAmount(data?.deliveryPaymentAmount)}</p> */}
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}> Account Status</p>
              <p>Locked</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Lock Account On Transfer</p>
              <p>No</p>
            </div>
            <div className={styles.operation_container}>
              <h4 className={styles.header}>Perform operation</h4>
            </div>

            <div className={styles.input_cotainer}>
              <label htmlFor='action'>Select Action:</label>
              <select
                id='action'
                value={selectedAction}
                onChange={handleOperationChange}
              >
                <option value=''>-- Choose an option --</option>
                <option value='update'>Update Account Status</option>
                <option value='deposit'>Deposit to Account</option>
              </select>
            </div>
            {selectedAction === 'update' && (
              <div className={styles.update_container}>
                <button>Update Account</button>
              </div>
            )}
            {selectedAction === 'deposit' && (
              <div className={styles.deposit_container}>
                <button>Deposit to Account</button>
              </div>
            )}
          </div>
        )}

        {/* <CallToAction
          loading={loading}
          text='Download Receipt'
          progressText='Downloading...'
          action={handleDownloadReceipt}
        /> */}
      </div>

      {openModal && <OverLayLoader />}
    </div>
  );
};

export default SingleUser;
