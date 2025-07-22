'use client';
import React from 'react';
import styles from './HeaderLayout.module.css';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function removeHyphens(word) {
  return word.replace(/-/g, ' ');
}

const HeaderLayout = ({ children, type, pageHeader, url }) => {
  const router = useRouter();

  return (
    <main className={styles.header_container}>
      <div className={styles.desktop_header}>
        {type === 'go back' ? (
          <button onClick={() => router.back()} className={styles.btn_goback}>
            <IoArrowBackOutline size={20} /> Go back
          </button>
        ) : (
          <Link className={styles.btn_goback} href={url}>
            <IoArrowBackOutline size={20} /> Back to dashboard
          </Link>
        )}
        <h1>{removeHyphens(pageHeader)}</h1>
      </div>
      <div className={styles.mobile_header}>
        <button onClick={() => router.back()} className={styles.btn_back}>
          <MdKeyboardArrowLeft className={styles.back_icon} />
        </button>
        <p>{pageHeader}</p>
      </div>
      {children}
    </main>
  );
};

export default HeaderLayout;
