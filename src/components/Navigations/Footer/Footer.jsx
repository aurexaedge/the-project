import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import { CiFacebook } from 'react-icons/ci';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiTwitter } from 'react-icons/fi';
import { AiOutlineLinkedin } from 'react-icons/ai';
import LogoItem from '../../LogoItem/LogoItem';
import Link from 'next/link';

const Footer = () => {
  return (
    <div>
      <div className={styles.footer_container}>
        <div className={styles.footer_left}>
          <div className={styles.leftbar}>
            <LogoItem background={true} />
          </div>
        </div>
        <div className={styles.footer_right}>
          <div className={styles.footer_card}>
            <h3>Solutions</h3>
            <p>Core Banking</p>
            <p>Digital Engagement Suite</p>
            <p>Corporate Banking Solution Suite</p>
            <p>Cash Management Suite</p>
            <p>Payment Suite</p>
            <p>Digital Lending</p>
            <p>All Solutions</p>
          </div>
          <div className={styles.footer_card}>
            <h3>Spotlight</h3>
            <p>Retail Banking</p>
            <p>Corporate Banking</p>
            <p>Consulting</p>
            <p>Wealth Management</p>
            <p>Digital - Only Banks</p>
          </div>
          <div className={styles.footer_card}>
            <h3>Better Banking</h3>
            <p>Inspiring Better Banking</p>
            <p>Operate Better</p>
            <p>Better Technology</p>
            <p>Engage Better</p>
            <p>Innovate Better</p>
            <p>Transform Better</p>
          </div>
          <div className={styles.footer_card}>
            <h3>Technology</h3>
            <p>Composable Platform</p>
            <p>Configurable Experience Stack</p>
            <p>Automation first design</p>
            <p>Robust Data And AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
