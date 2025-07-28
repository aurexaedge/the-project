'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './EditTimeModal.module.css';
import { MdOutlineCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const EditTimeModal = ({ setShowPopup, showPopup, data, isLoading, id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const ref = useRef(null);

  const [formData, setFormData] = useState({
    beneficiaryAccountName: '',
    createdAt: new Date(),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        beneficiaryAccountName: data.beneficiaryAccountName || '',
        createdAt: data.createdAt ? new Date(data.createdAt) : null,
      });
    }
  }, [id, data]);

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
  const handleInputChange = (eventOrDate, name) => {
    if (name) {
      // DatePicker case
      setFormData((prev) => ({
        ...prev,
        [name]: eventOrDate,
      }));
    } else {
      // Normal input case
      const { name, type, checked, value } = eventOrDate.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };
  const { mutate: handleUpdateTime, isPending } = useMutation({
    mutationFn: async () => {
      console.log('fff', formData);
      const res = await axios.post(`/api/v1/admin/fund/${id}`, formData);
      return res.data;
    },

    onSuccess: async (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries(['singleTransactionOrder', 'id']);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

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
          <div ref={ref} className={styles.continue_wrapper}>
            <div className={styles.continue_wrapper_header}>
              <p>Edit Date/Time</p>
              <MdOutlineCancel
                onClick={handleModalPopUp}
                className={styles.continue_cancel_icon}
              />
            </div>

            <div className={styles.nin_container}>
              {isLoading && <CircleLoader />}

              {data && (
                <>
                  <div className={styles.accountDetails}>
                    <label
                      style={{ fontSize: '12px' }}
                      htmlFor='selectDateTime'
                    >
                      Date:
                    </label>{' '}
                    <br />
                    <DatePicker
                      selected={
                        formData.createdAt ? new Date(formData.createdAt) : null
                      }
                      onChange={(date) => handleInputChange(date, 'createdAt')}
                      showTimeSelect
                      dateFormat='Pp'
                      className={styles.formateDate}
                    />
                    <input
                      type='text'
                      name='beneficiaryAccountName'
                      value={formData?.beneficiaryAccountName}
                      id=''
                      onChange={handleInputChange}
                    />
                    {/* <p>
                      c - date{' '}
                      {formData?.createdAt
                        ? formData.createdAt.toISOString()
                        : 'No date'}
                    </p> */}
                  </div>

                  <div className={styles.button_container}>
                    <button
                      onClick={handleUpdateTime}
                      className={styles.btn_close}
                      disabled={isPending}
                    >
                      {isPending ? 'Updating...' : 'Update Date/Time'}
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

export default EditTimeModal;
