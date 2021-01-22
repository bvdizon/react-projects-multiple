import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, closeAlert, type }) => {
  useEffect(() => {
    setTimeout(() => {
      // this is a function passed as prop from App.js
      // this function calls dispatch function, with
      // action.type of "CLOSE_ALERT", then pass to
      // reducer.js to close the alert in 3 seconds
      closeAlert();
    }, 3000);
  });

  return (
    <div className={`alert alert-${type}`}>
      <h5>{message}</h5>
    </div>
  );
};

export default Alert;
