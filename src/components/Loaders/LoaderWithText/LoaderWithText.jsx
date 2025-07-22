import React from 'react';
import CircleLoader from '../CircleLoader/CircleLoader';

const LoaderWithText = () => {
  return (
    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
      <CircleLoader /> <span style={{ fontSize: '12px' }}>Loading...</span>
    </div>
  );
};

export default LoaderWithText;
