import React from 'react';
import styles from './FrontCard.module.css';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import { formatNin } from '@/utils/formatNin';
import QRCode from 'react-qr-code';
import { currentDate } from '@/utils/currentDate';
import { formatDate } from '@/utils/formatDate';

const FrontCard = ({ userInfo }) => {
  return (
    <div className={styles.ninCard}>
      <img
        className={styles.standardBackground1Icon}
        alt=''
        src='/standardassets/standard-background-1@2x.png'
      />
      <img className={styles.ninCardChild} alt='photo' src={userInfo?.photo} />
      <div className={styles.frameParent}>
        <div className={styles.surnamenomParent}>
          <div className={styles.surnamenom}>Surname/Nom</div>
          <div className={styles.cyril}>{userInfo?.surname}</div>
        </div>
        <div className={styles.givenNamesprenomsParent}>
          <div className={styles.givenNamesprenoms}>Given Names/Prenoms</div>
          <div
            className={styles.cyril}
          >{`${userInfo?.firstname} ${userInfo?.middlename}`}</div>
        </div>
        <div className={styles.givenNamesprenomsParent}>
          <div className={styles.givenNamesprenoms}>Date of Birth</div>
          <div className={styles.cyril}>
            {formatDateOfBirth(userInfo?.birthdate)}
          </div>
        </div>
      </div>
      <div className={styles.div}>{userInfo?.nin}</div>
      <div className={styles.div1}>{userInfo?.nin}</div>
      <div className={styles.div2}>{userInfo?.nin}</div>
      <div className={styles.div3}>{userInfo?.nin}</div>
      <div className={styles.barcode1Icon}>
        <QRCode
          size={256}
          style={{
            height: 'auto',
            maxWidth: '100%',
            width: '100%',
          }}
          value={`Name: ${userInfo?.surname} ${userInfo?.firstname} ${
            userInfo?.middlename
          } | NIN: ${userInfo?.nin} | DOB: ${formatDate(
            userInfo?.birthdate
          )} | ISS ${currentDate()}`}
          viewBox={`0 0 256 256`}
        />
      </div>
      <b className={styles.nationalIdentificationNumber}>
        National Identification Number (NIN)
      </b>
      <b className={styles.nga}>NGA</b>
      <div className={styles.div4}>{formatNin(userInfo?.nin)}</div>
      <i className={styles.kindlyEnsureYou}>
        Kindly ensure you scan the barcode to verify the credentials
      </i>
    </div>
  );
};

export default FrontCard;
54671471200;
