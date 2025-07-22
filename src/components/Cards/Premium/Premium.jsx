import React from 'react';
import FrontCard from './FrontCard';
import BackCard from './BackCard';
const Premium = ({ userInfo }) => {
  return (
    <div>
      <FrontCard userInfo={userInfo} />
      <BackCard />
    </div>
  );
};

export default Premium;
