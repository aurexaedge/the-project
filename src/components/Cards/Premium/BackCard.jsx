import React from 'react';
import styles from './BackCard.module.css';

const BackCard = () => {
  return (
    <div className={styles.ninCard}>
      <section className={styles.ninCardInner}>
        <div className={styles.frameParent}>
          <div className={styles.disclaimerWrapper}>
            <a className={styles.disclaimer}>DISCLAIMER</a>
          </div>
          <div className={styles.verificationNotice}>
            <a className={styles.trustButVerify}>Trust, but verify</a>
          </div>
          <div
            className={styles.kindlyEnsureEach}
          >{`Kindly ensure each time this ID is presented, that you verify the credentials using a Government-APPROVED verification resource. The details on the front of this NIN Slip must EXACTLY match the verification result. `}</div>
        </div>
      </section>
      <section className={styles.cautionNoticeParent}>
        <div className={styles.cautionNotice}>
          <div className={styles.caution}>CAUTION!</div>
        </div>
        <div className={styles.ifThisNinContainer}>
          <p className={styles.ifThisNin}>
            If this NIN was not issued to the person on the front of this
            document, please DO NOT attempt to scan, photocopy or replicate the
            personal data contained herein.
          </p>
          <p className={styles.youAreOnly}>
            You are only permitted to scan the barcode for the purpose of
            identity verification.
          </p>
          <p className={styles.theFederalGovernment}>
            The FEDERAL GOVERNMENT of NIGERIA assumes no responsibility if you
            accept any variance in the scan result or do not scan the 2D barcode
            overleaf
          </p>
        </div>
      </section>
    </div>
  );
};

export default BackCard;
