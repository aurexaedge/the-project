import styles from './DotLoader.module.css';

const DotLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className={styles.dots}></div>
    </div>
  );
};

export default DotLoader;
