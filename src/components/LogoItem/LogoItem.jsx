import Image from 'next/image';
import styles from './LogoItem.module.css';
import Link from 'next/link';

const LogoItem = ({ background }) => {
  return (
    <div className={styles.leftbar}>
      <div
        style={{
          position: 'relative',
          width: '220px',
          height: '90px',
          marginRight: '20px',
        }}
      >
        {/* width: '250px',
          height: '90px', */}
        <Link href='/'>
          <Image
            src='/auxlogo.png'
            alt='aurexa logo'
            fill
            style={{ objectFit: 'contain' }}
            //   sizes='(max-width:768px) 100vw 700px'
          />
        </Link>
      </div>
    </div>
  );
};

export default LogoItem;
