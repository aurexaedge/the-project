import React from 'react';
import styles from './FrontCard.module.css';
import { formatDateOfBirth } from '@/utils/formatDateOfBirth';
import { formatNin } from '@/utils/formatNin';
import { currentDate } from '@/utils/currentDate';
import QRCode from 'react-qr-code';
import { formatDate } from '@/utils/formatDate';
const FrontCard = ({ userInfo }) => {
  return (
    <div className={styles.ninCard}>
      <img
        className={styles.premuimBackground1Icon}
        alt=''
        src='/premiumassets/premuim-background-1@2x.png'
      />
      <section className={styles.frameParent}>
        <div className={styles.mainContentParent}>
          <div className={styles.mainContent}>
            <div className={styles.federalRepublicOfNigeriaParent}>
              <b className={styles.federalRepublicOf}>
                FEDERAL REPUBLIC OF NIGERIA
              </b>
              <a className={styles.digitalNinSlip}>DIGITAL NIN SLIP</a>
            </div>
            <div className={styles.nameContentWrapper}>
              <div className={styles.nameContent}>
                <div className={styles.nameDetails}>
                  <img
                    className={styles.nameBorderIcon}
                    loading='lazy'
                    alt=''
                    src={userInfo?.photo}
                  />
                  <div className={styles.div}>{userInfo?.nin}</div>
                </div>
                <div className={styles.nameDisplay}>
                  <div className={styles.surnamenoms}>SURNAME/NOMS</div>
                  <div className={styles.miuweme}>{userInfo?.surname}</div>
                  <div className={styles.givenNamesprenoms}>
                    GIVEN NAMES/PRENOMS
                  </div>
                  <div
                    className={styles.godblessOchia}
                  >{`${userInfo?.firstname} ${userInfo?.middlename}`}</div>
                  <div className={styles.frameGroup}>
                    <div className={styles.birthDateParent}>
                      <div className={styles.birthDate}>
                        <div className={styles.dateOfBirth}>DATE OF BIRTH</div>
                      </div>
                      <div className={styles.sexsexe}>SEX/SEXE</div>
                    </div>
                    <div className={styles.apr1990Parent}>
                      <div className={styles.apr1990}>
                        {formatDateOfBirth(userInfo?.birthdate)}
                      </div>
                      <div className={styles.genderContent}>
                        <div className={styles.male}>
                          {userInfo?.gender[0]?.toLowerCase() === 'm'
                            ? 'MALE'
                            : 'FEMALE'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barcodeContentWrapper}>
            <div className={styles.barcodeContent}>
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
              <div className={styles.ngaWrapper}>
                <b className={styles.nga}>NGA</b>
              </div>
              <div className={styles.issueDateContentWrapper}>
                <div className={styles.issueDateContent}>
                  <div className={styles.issueDateWrapper}>
                    <div className={styles.issueDate}>ISSUE DATE</div>
                  </div>
                  <div className={styles.jul2024}>{currentDate()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.nationalIdentificationNumberWrapper}>
          <b className={styles.nationalIdentificationNumber}>
            National Identification Number (NIN)
          </b>
        </div>
      </section>
      <div className={styles.parent}>
        <div className={styles.div1}>{userInfo?.nin}</div>
        <div className={styles.blankWrapper}>
          <div className={styles.blank}>{formatNin(userInfo?.nin)}</div>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
