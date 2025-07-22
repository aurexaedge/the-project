import React from 'react';
import styles from './NinSlip.module.css';

const NinSlip = ({ userInfo }) => {
  return (
    <div>
      <div className={styles.ninSlip}>
        <section className={styles.lineParent}>
          <div className={styles.frameChild} />
          <img
            className={styles.frameItem}
            loading='lazy'
            alt=''
            src='/ninassets/frame-11@2x.png'
          />
          <div className={styles.frameParent}>
            <div className={styles.imagesRemovebgPreview1Wrapper}>
              <img
                className={styles.imagesRemovebgPreview1Icon}
                loading='lazy'
                alt=''
                src='/ninassets/imagesremovebgpreview-1@2x.png'
              />
            </div>
            <div className={styles.nationalIdentityManagementSParent}>
              <div className={styles.nationalIdentityManagement}>
                National Identity Management System
              </div>
              <div className={styles.iconContainer}>
                <div className={styles.federalRepublicOf}>
                  Federal Republic of Nigeria
                </div>
              </div>
              <div className={styles.nationalIdentificationNumberWrapper}>
                <div className={styles.nationalIdentificationNumber}>
                  National Identification Number Slip (NINS)
                </div>
              </div>
            </div>
            <img
              className={styles.nationalIdentityManagementCIcon}
              loading='lazy'
              alt=''
              src='/ninassets/nationalidentitymanagementcommissionnimcremovebgpreview-1@2x.png'
            />
          </div>
          <div className={styles.lineGroup}>
            <div className={styles.frameInner} />
            <div className={styles.trackingIdParent}>
              <a className={styles.trackingId}>Tracking ID:</a>
              <div className={styles.y0nzd65003ksnb}>
                {userInfo?.trackingId}
              </div>
              <b className={styles.surname}>Surname:</b>
              <div className={styles.abel}>{userInfo?.surname}</div>
              <a className={styles.address}>Address:</a>
              <div className={styles.chiefElijahNuebuchi}>
                {userInfo?.residence_address}
              </div>
              <div className={styles.portHarcourt}>
                {userInfo?.residence_lga}
              </div>
              <div className={styles.rivers}>{userInfo?.residence_state}</div>
              <b className={styles.firstName}>First Name:</b>
              <div className={styles.christaina}>{userInfo?.firstname}</div>
              <b className={styles.middleName}>Middle Name:</b>
              <div className={styles.bibora}>{userInfo?.middlename}</div>
              <b className={styles.gender}>Gender:</b>
              <div className={styles.f}>
                {userInfo?.gender[0]?.toUpperCase()}
              </div>
              <b className={styles.nin}>NIN:</b>
              <div className={styles.info}>{userInfo?.nin}</div>
              <div className={styles.info1} />
              <div className={styles.separator} />
              <div className={styles.info2} />
              <div className={styles.separator1} />
              <img
                className={styles.separatorIcon}
                loading='lazy'
                alt=''
                src='/ninassets/line-7.svg'
              />
              <img
                className={styles.photoIcon}
                loading='lazy'
                alt='photo'
                src={userInfo?.photo}
              />
              <div className={styles.info3} />
            </div>
          </div>
          <div className={styles.separator2} />
          <div className={styles.frameGroup}>
            <div className={styles.youWillBeNotifiedWhenYourParent}>
              <div className={styles.youWillBe}>
                You will be notified when your National Identity Card is ready
              </div>
              <div className={styles.forAnyEnquiries}>
                (for any enquiries please contact)
              </div>
            </div>
            <div className={styles.callInfoWrapper}>
              <div className={styles.callInfo}>
                <div className={styles.helpdesknimcgovngWrapper}>
                  <div className={styles.helpdesknimcgovng}>
                    helpdesk@nimc.gov.ng
                  </div>
                </div>
                <div className={styles.callInfoInner}>
                  <div className={styles.lineDiv} />
                </div>
                <div className={styles.addressPanelWrapper}>
                  <div className={styles.addressPanel}>
                    <div className={styles.images1RemovebgPreview1Wrapper}>
                      <img
                        className={styles.images1RemovebgPreview1Icon}
                        loading='lazy'
                        alt=''
                        src='/ninassets/images--1-removebgpreview-1@2x.png'
                      />
                    </div>
                    <div className={styles.wwwnimcgovng}>www.nimc.gov.ng</div>
                  </div>
                </div>
                <div className={styles.callInfoChild}>
                  <div className={styles.frameChild1} />
                </div>
                <div className={styles.callCenter}>
                  <div className={styles.callCenterLabel}>
                    <div className={styles.faphoneSquareWrapper}>
                      <img
                        className={styles.faphoneSquareIcon}
                        loading='lazy'
                        alt=''
                        src='/ninassets/faphonesquare.svg'
                      />
                    </div>
                    <div className={styles.callNimc}>0700-CALL-NIMC</div>
                    <div className={styles.div}>(0700-2255-646)</div>
                  </div>
                </div>
                <div className={styles.separator3} />
                <div className={styles.addressDetailsWrapper}>
                  <div className={styles.addressDetails}>
                    <div className={styles.nationalIdentityManangementWrapper}>
                      <div className={styles.nationalIdentityManangement}>
                        National Identity Manangement Commission
                      </div>
                    </div>
                    <div className={styles.sokodeCrescentOff}>
                      11, Sokode Crescent, Off Dalaba Street, Zone 5 Wuse, Abuja
                      Nigera
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NinSlip;
