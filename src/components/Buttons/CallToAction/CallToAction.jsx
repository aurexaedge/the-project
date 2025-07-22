import React from 'react';
import styles from './CallToActtion.module.css';
// import SiginLoader from '@/components/Loaders/SigninLoader/SiginLoader';
import CircleLoader from '@/components/Loaders/CircleLoader/CircleLoader';

const CallToAction = ({ loading, text, action, progressText }) => {
  return (
    <button
      onClick={action}
      disabled={loading}
      className={
        loading
          ? `${styles.btn_login} ${styles.btn_login_inactive}`
          : styles.btn_login
      }
    >
      {loading ? <CircleLoader /> : text}
      {loading && progressText ? progressText : ''}
    </button>
  );
};

export default CallToAction;
