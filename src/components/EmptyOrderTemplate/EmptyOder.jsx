import React from 'react';
import styles from './EmptyOrder.module.css';
import Image from 'next/image';

const EmptyOder = ({ text }) => {
  return (
    <div className={styles.empty_notification}>
      <div className={styles.image_container}>
        <Image
          fill
          style={{ objectFit: 'contain' }}
          alt='empty'
          src='/empty_history.svg'
          sizes='(max-width:768px) 100vw 700px'
        />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default EmptyOder;
