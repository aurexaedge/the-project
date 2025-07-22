import React from 'react';
import styles from './ErrorTemplate.module.css';

const ErrorTemplate = ({ text }) => {
  return (
    <div className={styles.error_container}>
      <h3>Oops!</h3>
      <p>Something went wrong fetching {text}</p>
    </div>
  );
};

export default ErrorTemplate;
