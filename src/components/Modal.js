import React, { useEffect } from 'react';

// 'modalContent' is a state passed as a prop
const Modal = ({ modalContent, closeModal }) => {
  // using useEffect to call closeModal function
  useEffect(() => {
    // wait 3 seconds to execute closeModal function
    setTimeout(() => {
      closeModal();
    }, 3000);
  });

  return (
    <div>
      <h3>{modalContent}</h3>
    </div>
  );
};

export default Modal;
