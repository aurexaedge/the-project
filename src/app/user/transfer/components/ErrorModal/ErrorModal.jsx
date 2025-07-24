'use client';
import React, { useState, useRef } from 'react';
import styles from './ErrorModal.module.css';
import { MdOutlineCancel } from 'react-icons/md';
import { IoWarningOutline } from 'react-icons/io5';
import { IoWarning } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

const ErrorModal = ({ setShowPopup, showPopup }) => {
  const ref = useRef(null);

  const handleModalPopUp = () => {
    setShowPopup(!showPopup);
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
          className={`${styles.continue_container} ${
            showPopup ? styles.active : styles.inactive
          }`}
        >
          <div ref={ref} id='paynow' className={styles.continue_wrapper}>
            <div className={styles.continue_wrapper_header}>
              <IoWarning size={20} className={styles.warning_icon} />
              <p>Malicious activity suspected in your account.</p>
            </div>

            <div className={styles.message_wrapper}>
              <div className={styles.errorMessage}>
                <MdCancel size={18} color='red' className={styles.close_icon} />
                <span>
                  A new IP address accessed your account. Account has been
                  deactivated, contact support
                </span>
              </div>
              <span className={styles.email}>support@aurexaedge.com</span>
            </div>
            <button onClick={handleModalPopUp} className={styles.btn_close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
