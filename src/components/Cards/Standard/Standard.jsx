import React from 'react';
import styles from './Standard.module.css';
import FrontCard from './FrontCard';
import BackCard from '../Premium/BackCard';
import CardWrapper from '../CardWrapper/CardWrapper';

const Standard = ({ userInfo }) => {
  return (
    <div>
      <FrontCard userInfo={userInfo} />
      <BackCard />
    </div>
  );
};

export default Standard;
