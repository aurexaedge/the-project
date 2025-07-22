import React from 'react';
import styles from './PasswordChecker.module.css';
import { FaRegCheckCircle } from 'react-icons/fa';
const PasswordChecker = ({ password, message, progress, getActiveColor }) => {
  return (
    <div className={styles.password_checker}>
      <div className={styles.progress_bg}>
        <div
          className={styles.progress}
          style={{
            width: progress,
            backgroundColor: getActiveColor(message),
          }}
        ></div>
      </div>
      {password.length !== 0 ? (
        //Display password strength message when a password is entered
        <p
          className={styles.message}
          style={{ color: getActiveColor(message) }}
        >
          Password is {message}
        </p>
      ) : null}
      {message !== 'Strong' && (
        <div className={styles.size}>
          <p>Your password should contain:</p>
          <div className={styles.input_group}>
            <span className={password.length >= 8 && styles.check_icon_gren}>
              <FaRegCheckCircle size={15} />
            </span>
            <span>8 characters minimum</span>
          </div>
          <div className={styles.input_group}>
            <span className={/[a-z]+/.test(password) && styles.check_icon_gren}>
              <FaRegCheckCircle size={15} />
            </span>
            <span>A Lowercase letter (a)</span>
          </div>
          <div className={styles.input_group}>
            <span className={/[A-Z]+/.test(password) && styles.check_icon_gren}>
              <FaRegCheckCircle size={15} />
            </span>
            <span>An Uppercase letter (A)</span>
          </div>
          <div className={styles.input_group}>
            <span className={/[0-9]+/.test(password) && styles.check_icon_gren}>
              <FaRegCheckCircle size={15} />
            </span>
            <span>A number (1)</span>
          </div>

          <div className={styles.input_group}>
            <span
              className={
                /[^A-Za-z0-9]+/.test(password) && styles.check_icon_gren
              }
            >
              <FaRegCheckCircle size={15} />
            </span>
            <span>A special character (!@#)</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChecker;
