// components/Modal.js
import React from "react";
import styles from "../../styles/Modal.module.css";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
