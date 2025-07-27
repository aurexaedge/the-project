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
    city: '',
    createdAt: new Date(),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        city: data.city || '',
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
      const requiredFields = ['bankName', 'beneficiaryAccountName'];

      const hasEmptyFields = requiredFields.some(
        (field) => formData[field].length === 0
      );

      if (hasEmptyFields) {
        throw new Error('Validation Error: All fields must be completed');
      }

      const res = await axios.post(`/api/v1/transaction`, formData);
      return res.data;
    },

    onSuccess: async (res) => {
      setFormData({
        bankName: '',
        beneficiaryAccountName: '',
        picture: '',
      });
      toast.success('update successful');
      queryClient.invalidateQueries(['fetchWallet', 'id']);
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
          <div ref={ref} id='paynow' className={styles.continue_wrapper}>
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
                    <p>{data?.createdAt}</p>
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

export default EditTimeModal;
