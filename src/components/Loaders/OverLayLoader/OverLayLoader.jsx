import React from 'react';
import styles from './OverLayLoader.module.css';

import DotLoader from '../DotLoader/DotLoader';
const OverLayLoader = () => {
  return (
    <div className={styles.spinner}>
      {/* You can use any spinner implementation */}
      {/* <div className={styles.loader}>loading...</div> */}
      <DotLoader />
      {/* <NewLoader/> */}
    </div>
  );
};

export default OverLayLoader;
