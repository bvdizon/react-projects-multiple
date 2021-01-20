import React from 'react';
import loading from './loading-ripple.svg';
const Loading = () => {
  return (
    <div className='spinner'>
      <img src={loading} alt='' />
    </div>
  );
};

export default Loading;
