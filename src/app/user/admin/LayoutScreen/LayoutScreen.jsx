'use client';
import React from 'react';
import styles from './LayoutScreen.module.css';
import Link from 'next/link';
import { FaBoxOpen, FaMapMarkerAlt, FaUserTag } from 'react-icons/fa';
import { FaFileInvoice } from 'react-icons/fa6';
import { useRouter, usePathname } from 'next/navigation';
import { LiaSmileWinkSolid } from 'react-icons/lia';

const menuItems = [
  {
    id: 'transactions',
    url: '/user/admin/transactions',
    menuName: 'Transfer',
    iconsType: <FaMapMarkerAlt />,
  },
  {
    id: 'users',
    url: '/user/admin/users',
    menuName: 'Users',
    iconsType: <FaFileInvoice />,
  },
  // {
  //   id: 'settings',
  //   url: '/user/admin/settings',
  //   menuName: 'Settings',
  //   iconsType: <FaMapMarkerAlt />,
  // },
];
const LayoutScreen = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className={styles.layout_container}>
      <p className={styles.admin_heading}>
        Admin Dashboard <LiaSmileWinkSolid style={{ color: 'red' }} />{' '}
      </p>

      <div className={styles.layout_navbar}>
        {menuItems.map((item) => {
          const basePath = item.url.replace(/\/$/, '');
          const isActive = pathname.startsWith(basePath);

          return (
            <Link
              key={item?.id}
              className={
                isActive
                  ? `${styles.navbar_items_active} ${styles.navbar_items} `
                  : styles.navbar_items
              }
              href={item?.url}
            >
              {item?.iconsType}
              {item?.menuName}
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default LayoutScreen;
