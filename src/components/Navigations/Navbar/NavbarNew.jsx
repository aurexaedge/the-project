'use client';
import React from 'react';
import styles from './NavbarNew.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { LuLockKeyhole } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import LogoItem from '@/components/LogoItem/LogoItem';

const NavbarNew = () => {
  return (
    <div className={styles.Navbar_container}>
      <div className={styles.navbar_wrapper_top}>
        <div className={styles.topbar}>
          <Link className={styles.top_link} href='/'>
            support@aurexaedge.com
          </Link>
          <Link className={styles.top_link} href='/'>
            ATM &amp; Branch
          </Link>
          <Link className={styles.top_link} href='/'>
            Help &amp; Support
          </Link>
        </div>
      </div>

      <div className={styles.navba_wrapper_menu}>
        <div className={styles.menu_container}>
          <div className={styles.leftbar}>
            <LogoItem />
            <Link
              href='/#'
              className={`${styles.item_wrapper} ${styles.first}`}
            >
              Bank
            </Link>
            <Link href='/#' className={styles.item_wrapper}>
              Cards
            </Link>
            <Link href='/#' className={styles.item_wrapper}>
              Insure
            </Link>
            <Link href='/#' className={styles.item_wrapper}>
              Borrow
            </Link>
            <Link href='/#' className={styles.item_wrapper}>
              Invest
            </Link>
          </div>

          <div className={styles.rightbar}>
            <div className={styles.input_wrapper}>
              <input placeholder='Search' type='text' />
              <CiSearch size={15} />
            </div>
            <Link
              href='/auth/login'
              className={`${styles.item_wrapper} ${styles.btn_login} `}
            >
              <LuLockKeyhole size={15} />
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarNew;
