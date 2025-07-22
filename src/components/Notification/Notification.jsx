import React from 'react';
import styles from './Notification.module.css';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { NotificationChat } from '@/utils/chat';

const Notification = () => {
  return (
    <span className={styles.news_wrapper}>
      <IoMdInformationCircleOutline size={18} className={styles.icon} />
      we are deeply sorry for the whatsapp glitch, we have created a new
      whatsapp link,{' '}
      <span
        onClick={() => NotificationChat()}
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
      >
        click here to join
      </span>
    </span>
  );
};

export default Notification;
