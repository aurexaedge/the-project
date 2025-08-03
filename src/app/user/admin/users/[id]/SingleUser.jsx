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
import ErrorTemplate from '@/components/ErrorTemplate/ErrorTemplate';
import { formatAmount } from '@/utils/formatAmount';
import { MdLock } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';

const SingleUser = ({ id }) => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    depositAmount: '',
    isAccountLocked: null,
    lockAccountOnTransfer: null,
  });

  const { data, isError, isLoading, isPending, isFetching } = useQuery({
    queryKey: ['singleUserForAdmin', id],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/admin/users/${id}`);
      const data = await response.data.message;

      return data;
    },
    staleTime: 1000,
    refetchInterval: 1000 * 60,
  });

  useEffect(() => {
    if ((data, id)) {
      setFormData({
        ...formData,
        username: data?.userId?.username,
        lockAccountOnTransfer: data?.lockAccountOnTransfer,
        isAccountLocked: data?.isAccountLocked,
      });
    }
  }, [data, id]);

  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleAmountInputChange = (e) => {
    const valueWithoutNonNumericChars = e.target.value.replace(/[^0-9]/g, '');
    const valueWithoutCommas = valueWithoutNonNumericChars.replace(/,/g, '');

    const numberValue = Number(valueWithoutCommas);

    if (!isNaN(numberValue)) {
      const formattedValue =
        valueWithoutCommas !== '' ? numberValue.toLocaleString() : '';
      setFormData({
        ...formData,
        depositAmount: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        depositAmount: valueWithoutCommas,
      });
    }
  };

  const [selectedAction, setSelectedAction] = useState('');

  const handleOperationChange = (e) => {
    setSelectedAction(e.target.value);
  };

  const iconStyle = {
    fontSize: '1rem',
    verticalAlign: 'middle',
  };

  const { mutate: handleUpdateStatus, isPending: submitOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const res = await axios.put(`/api/v1/admin/users`, {
          ...formData,
          userId: id,
        });
        return res.data;
      },

      onSuccess: async (res) => {
        toast.success(res?.message);

        queryClient.invalidateQueries([
          'singleUserForAdmin, fetchUsersForAdmin',
        ]);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },
    });
  const { mutate: handleDepositAmount, isPending: submitAmountOrderIsPending } =
    useMutation({
      mutationFn: async () => {
        const res = await axios.post(`/api/v1/admin/fund`, {
          ...formData,
          userId: id,
          amount: formData?.depositAmount,
        });
        return res.data;
      },

      onSuccess: async (res) => {
        toast.success(res?.message);

        queryClient.invalidateQueries([
          'singleUserForAdmin, fetchUsersForAdmin',
        ]);
      },
      onError: (error) => {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      },
    });

  const handleUpdateStatusWithConfirmation = (updateTpe) => {
    const userConfirmed = window.confirm('Do you wish to submit?');

    if (userConfirmed) {
      if (updateTpe === 'updateStatus') {
        handleUpdateStatus();
      } else {
        handleDepositAmount();
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isLoading === true && (
          <div style={{ marginBottom: '20px' }}>
            <CircleLoader />
          </div>
        )}
        {isError && <ErrorTemplate text='User' />}
        {data && (
          <div className={styles.reciept_container}>
            <h4 className={styles.header}>User Account Information</h4>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Username:</p>
              <p>{data?.userId?.username}</p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Account Balance</p>
              <p>&#36;{formatAmount(data?.accountBalance)}</p>
              {/* <p>&#36;{formatAmount(data?.deliveryPaymentAmount)}</p> */}
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}> Account Status</p>
              <p
                style={{
                  color: data?.isAccountLocked ? 'red' : 'green',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  fontWeight: '600',
                }}
              >
                {data?.isAccountLocked ? (
                  <MdLock style={iconStyle} />
                ) : (
                  <IoIosCheckmarkCircleOutline style={iconStyle} />
                )}
                {data?.isAccountLocked ? 'Locked' : 'Active'}
              </p>
            </div>
            <div className={styles.receipt_card}>
              <p className={styles.detail_key}>Lock Account On Transfer</p>
              <p
                style={{
                  color: data?.lockAccountOnTransfer ? 'red' : 'green',
                  fontWeight: '600',
                }}
              >
                {data?.lockAccountOnTransfer ? 'Yes' : 'No'}
              </p>
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
                <div className={styles.update_wrapper}>
                  <label htmlFor='isAccountLocked'>Lock Account</label>
                  <input
                    type='checkbox'
                    name='isAccountLocked'
                    checked={formData?.isAccountLocked}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.update_wrapper}>
                  <label htmlFor='lockAccountOnTransfer'>
                    Lock Account On Transfer
                  </label>
                  <input
                    type='checkbox'
                    name='lockAccountOnTransfer'
                    checked={formData?.lockAccountOnTransfer}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  disabled={submitOrderIsPending}
                  onClick={() =>
                    handleUpdateStatusWithConfirmation('updateStatus')
                  }
                  className={styles.btn_process}
                >
                  {submitOrderIsPending ? 'Updating...' : 'Update Account'}
                </button>
              </div>
            )}
            {selectedAction === 'deposit' && (
              <div className={styles.deposit_container}>
                <div className={styles.input_cotainer}>
                  <label htmlFor='isAccountLocked'>Enter Amount</label>
                  <input
                    type='text'
                    inputMode='numeric'
                    name='accounBalance'
                    placeholder='enter amount'
                    value={formData?.depositAmount}
                    onChange={handleAmountInputChange}
                  />
                </div>
                <button
                  onClick={() => handleUpdateStatusWithConfirmation('FundUser')}
                  disabled={submitAmountOrderIsPending}
                  className={styles.btn_process}
                >
                  {submitAmountOrderIsPending
                    ? 'Updating Amount...'
                    : 'Deposit to Account'}
                </button>
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
