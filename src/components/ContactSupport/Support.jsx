import React from 'react';
import styles from './Support.module.css';
import { MdLock } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';

const Support = ({ header, isSupport, text }) => {
  return (
    <div className={styles.card_contaner}>
      {header && <h3>{header}</h3>}
      {/* <p>
        This service is not currently available to you at the moment, kindly
        contact our customer support for steps to activate this preferred
        service. Thank you!
      </p> */}
      <p>
        {isSupport ? (
          <MdOutlineSupportAgent className={styles.lock_icon} size={18} />
        ) : (
          <MdLock className={styles.lock_icon} size={18} color='red' />
        )}

        {isSupport ? (
          <span>{text}</span>
        ) : (
          <span>
            This service is currently locked at the moment, kindly contact our
            customer support for steps to activate this preferred service. Thank
            you!
          </span>
        )}
      </p>

      <p>support@aurexaedge.com</p>
    </div>
  );
};

export default Support;
