'use client';
import Link from 'next/link';
import styles from './LayoutScreen.module.css';
import { RxDashboard } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';
import { RiMenu3Line } from 'react-icons/ri';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { RiAdminLine } from 'react-icons/ri';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

import { AppContext } from '@/context/AppContext';
import { useContext } from 'react';

import { TbUserShield } from 'react-icons/tb';
import { PiBellLight } from 'react-icons/pi';
import { CiLogout } from 'react-icons/ci';
import { FaRocketchat } from 'react-icons/fa';
import { chat } from '@/utils/chat';
import { BsPerson } from 'react-icons/bs';
import useFetchData from '@/hooks/useFetchData';
import { formatAmount } from '@/utils/formatAmount';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';
import Notification from '@/components/Notification/Notification';
import { LiaMoneyBillSolid } from 'react-icons/lia';
import { BiTransferAlt } from 'react-icons/bi';
import { GoCreditCard } from 'react-icons/go';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiHistogram } from 'react-icons/gi';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { CiBank } from 'react-icons/ci';

const menuItems = [
  {
    id: 'dasboard',
    url: '/user/dashboard',
    menuName: 'Dashboard',
    iconsType: <RxDashboard />,
  },

  {
    id: 'bills',
    url: '/user/bills',
    menuName: 'Pay Bills',
    iconsType: <LiaMoneyBillSolid />,
  },
  {
    id: 'transfer',
    url: '/user/transfer',
    menuName: 'Tranfer',
    iconsType: <BiTransferAlt />,
  },
  {
    id: 'card',
    url: '/user/card',
    menuName: 'Card',
    iconsType: <GoCreditCard />,
  },
  {
    id: 'loans',
    url: '/user/loans',
    menuName: 'Loans',
    iconsType: <GiReceiveMoney />,
  },
  {
    id: 'transactions',
    url: '/user/transactions',
    menuName: 'Transactions',
    iconsType: <GiHistogram />,
  },
  {
    id: 'investment',
    url: '/user/investment',
    menuName: 'Investment',
    iconsType: <CiBank />,
  },
  // {
  //   id: 'profile',
  //   url: '/user/profile',
  //   menuName: 'Profile',
  //   iconsType: <TbUserShield />,
  // },
  {
    id: 'support',
    url: '/user/support',
    menuName: 'Support',
    iconsType: <MdOutlineSupportAgent />,
  },
];
export default function LayoutScreen({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);

  const { status, data: session } = useSession();

  const [loadBalance, setLoadBalance] = useState(false);

  const { user, setUser } = useContext(AppContext);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  const {
    data,
    isError,
    isLoading: isLoadingData,
    isPending,
    isFetching,
  } = useFetchData({
    queryKey: ['fetchWallet'],
    endpoint: '/api/v1/wallet/',
  });
  return (
    <div className={styles.dashboard_container}>
      {/* ist content  */}
      <div className={styles.dashboard_topBar}>
        <div className={styles.widget_container}>
          {/* <Notification /> */}
          <Link
            onClick={logoutClickHandler}
            className={styles.widget_icons}
            href='/auth/login'
          >
            <CiLogout />
          </Link>
        </div>
      </div>
      <div className={`${styles.dashboard_topBar} ${styles.extra_menu}`}>
        <div
          // onClick={() => router.push('/user/profile')}
          className={`${styles.user_info} ${styles.margin_top}`}
        >
          <h4>
            <BsPerson className={styles.profile_icon} />
          </h4>
          <div className={styles.user_balance}>
            {isLoadingData ? (
              <CircleLoader />
            ) : (
              <>
                <p>{session?.user?.firstName}</p>
                <span>&#36;{formatAmount(data?.accountBalance)}</span>
              </>
            )}
          </div>
        </div>
        <Link
          className={`${styles.widget_icons} ${styles.widget_icons_mobile} `}
          href='/user/dashboard'
        >
          <PiBellLight />
        </Link>
        <RiMenu3Line onClick={toggleMenu} className={styles.mobile_men_close} />
      </div>
      {/* second content  */}
      <div
        className={`${styles.left_sideBar} ${
          showMenu ? styles.active : styles.inactive
        }`}
      >
        <IoIosCloseCircleOutline
          onClick={toggleMenu}
          className={styles.mobile_men}
        />
        <div className={styles.user_info}>
          <h4>
            <BsPerson className={styles.profile_icon} />
          </h4>
          <div className={styles.user_balance}>
            {isLoadingData ? (
              <CircleLoader />
            ) : (
              <>
                <p>
                  `${session?.user?.firstName} ${session?.user?.lastName}`
                </p>
                <span>&#36;{formatAmount(data?.accountBalance)}</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.dashboard_menus}>
          {menuItems.map((item) => {
            return (
              <Link
                onClick={closeMenu}
                key={item?.id}
                className={
                  pathname === item?.url
                    ? `${styles.menu_items_active} ${styles.menu_items} `
                    : styles.menu_items
                }
                href={item?.url}
              >
                <span
                  className={
                    pathname === item?.url
                      ? `${styles.item_icon} ${styles.item_icon_active} `
                      : styles.item_icon
                  }
                >
                  {item?.iconsType}
                </span>
                {item?.menuName}
              </Link>
            );
          })}
          {/* {session?.user?.superUser === true && (
            <Link
              href='/user/admin/transactions/transfers'
              onClick={closeMenu}
              className={styles.user_admin}
            >
              <RiAdminLine className={styles.item_icon} />
              Admin
            </Link>
          )} */}
          <button onClick={logoutClickHandler} className={styles.user_logout}>
            <FiLogOut className={styles.logout_icon} />
            Logout
          </button>
        </div>
        <div className={styles.left_bar_bottom}>
          <div className={styles.copyright}>
            <p>
              <AiOutlineCopyrightCircle
                className={styles.copy_right_icon}
                size={16}
              />
              2025s
              <span>Aurexa Edge</span>
            </p>
          </div>
        </div>
      </div>
      {/* 3rd content Main  */}
      <div className={styles.main_content}>
        {/* <h3>testing microphone</h3> */}
        <div className={styles.main_content_wrapper}>{children}</div>
      </div>

      {/* {!pathname.startsWith('/user/admin/') && (
        <div onClick={() => chat()} className={styles.whatsapp_container}>
          <button>
            <FaRocketchat size={20} />
          </button>
        </div>
      )} */}

      {/* bottom bar  */}
      {/* <div className={styles.dashboard_bottomBar}>
        <div className={styles.bottomBar_message}>
          <div className={styles.copyright}>
            <p>
              <AiOutlineCopyrightCircle
                className={styles.copy_right_icon}
                size={16}
              />
              2024
              <span>support@mobosure.com</span>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
