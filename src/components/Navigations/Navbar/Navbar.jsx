'use client';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import LogoItem from '@/components/LogoItem/LogoItem';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [inTransition, setInTransition] = useState(false);

  const handleToggle = () => {
    setInTransition(true);
    setOpen(!open);
    setTimeout(() => {
      setInTransition(false);
    }, 300);
  };

  return (
    <div className={styles.nav_bg}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <LogoItem background={false} />
          <div className={styles.link_group}>
            <ul>
              <li>
                <Link className={styles.link} href='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link className={styles.link} href='/#services'>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(!open)}
                  className={styles.link}
                  href='/about-us'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpen(!open)}
                  className={styles.link}
                  href='/contact-us'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.btn_group}>
            <Link href='/auth/login' className={styles.nav_btn}>
              Login
            </Link>
            <Link href='/auth/register' className={styles.nav_btn1}>
              Get Started
            </Link>
          </div>

          <div className={styles.burger} onClick={handleToggle}>
            <div
              className={`${styles.icon} ${
                inTransition ? styles['icon_exit_active'] : styles['icon_exit']
              }`}
            >
              {open ? (
                <AiOutlineClose size={30} />
              ) : (
                <GiHamburgerMenu size={30} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.mobile_menu} ${
          open ? styles.active : styles.inactive
        }`}
      >
        {/* <div className={styles.mobile_menu}> */}
        <div className={styles.responsiveMenu}>
          <Link className={styles.link} href='/' onClick={() => setOpen(!open)}>
            Home
          </Link>
          <Link
            className={styles.link}
            href='/#services'
            onClick={() => setOpen(!open)}
          >
            Services
          </Link>
          <Link
            className={styles.link}
            href='/about-us'
            onClick={() => setOpen(!open)}
          >
            About
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            className={styles.link}
            href='/contact-us'
          >
            Contact Us
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href='/auth/login'
            className={styles.nav_btn}
          >
            Login
          </Link>
          <Link
            onClick={() => setOpen(!open)}
            href='/auth/register'
            className={styles.nav_btn1}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
