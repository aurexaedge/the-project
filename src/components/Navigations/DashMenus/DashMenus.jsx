import React from 'react';
import styles from './DashMenus.module.css';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const DashMenus = ({ serviceData }) => {
  return (
    <div className={styles.card_container}>
      {serviceData.map((item) => {
        return (
          <Link href={item?.url} key={item?.id} className={styles.card_wrapper}>
            <p className={styles.link}>
              <span>{item?.icon}</span>
              {item?.title}
            </p>
            <IoIosArrowForward size={15} />
          </Link>
        );
      })}
    </div>
  );
};

export default DashMenus;
