'use client';
import styles from './page.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowRoundForward } from 'react-icons/io';

export default function HomeScreen() {
  return (
    <div className={styles.container}>
      {/* Hero section  */}
      <div className={styles.hero_backgound}>
        <div className={styles.hero_section}>
          <div className={styles.left_container}>
            <p>
              Bank <IoIosArrowForward size={15} />
              Digital services <IoIosArrowForward size={15} /> Banking AT Your
              Covenience - Anytime, Anywhere{' '}
            </p>

            <div className={styles.hero_header}>
              <h2>Aurexa Edge Bank</h2>
              <p>The smartest way to bank-save, plan, and invest on-the-go</p>
            </div>
          </div>

          <div className={styles.hero_right}>
            <Image
              style={{ objectFit: 'contain' }}
              src='/hero_image_m.png'
              alt='aurexa bg'
              fill
              sizes='(max-width:768px) 100vw 700px'
            />
          </div>
        </div>
      </div>

      {/* why bank section  */}
      <div className={styles.why_bank}>
        <div className={styles.why_bank_left}>
          <p>
            {' '}
            <IoIosArrowRoundForward size={30} />
            Why Aurex Edge Bank?
          </p>
          <p>
            Easily start banking with us - manage your money, budget, and invest
            securely, all in one place with peace of mind
          </p>
        </div>

        <div className={styles.why_bank_right}>
          <p>No One Does It Better</p>
          <div className={styles.why_bank_card}>
            <div className={styles.image_container}>
              <Image
                src='/phone.webp'
                alt='aurexa bg'
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width:768px) 100vw 700px'
              />
            </div>

            <div className={styles.card_writeup}>
              <p>Simple way to start banking with us</p>
              <p>
                Open accounts, apply for cards, and invest in just few taps.
              </p>
            </div>
          </div>
          <div className={styles.why_bank_card}>
            <div className={styles.image_container}>
              <Image
                src='/money.webp'
                alt='aurexa bg'
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width:768px) 100vw 700px'
              />
            </div>

            <div className={styles.card_writeup}>
              <p>Bank, budget, invest – all in one app</p>
              <p>
                From everyday banking to reaching your financial goals, it can
                all be done on the digibank mobile app.
              </p>
            </div>
          </div>
          <div className={styles.why_bank_card}>
            <div className={styles.image_container}>
              <Image
                src='/lock.webp'
                alt='aurexa bg'
                fill
                style={{ objectFit: 'contain' }}
                sizes='(max-width:768px) 100vw 700px'
              />
            </div>

            <div className={styles.card_writeup}>
              <p>Bank with a peace of mind</p>
              <p>Enjoy peace of mind with our advanced security measures.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aurexa Edge Bank */}

      {/* globle section  */}
      <div className={styles.globe_container}>
        <div className={styles.globe_wrapper}>
          <p>
            Aurexa Edge Is a Global Leader With Multi-Country Expertise,
            Capabilities and Reach
          </p>

          <div className={styles.globe_count}>
            <div className={styles.globe_card}>
              <p>110 k+</p>
              <p>BRANCHES</p>
            </div>
            <div className={styles.globe_card}>
              <p>110+</p>
              <p>COUNTRIES</p>
            </div>
            <div className={styles.globe_card}>
              <p>1.3 Bn+</p>
              <p>LIVES IMPACTED EVERY DAY</p>
            </div>
            <div className={styles.globe_card}>
              <p>1.7 Bn+</p>
              <p>ACCOUNTS RUN ON AUREXA EDGE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
