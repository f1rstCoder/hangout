import { useEffect } from "react";
import React from "react";
import { createPortal } from "react-dom";

const ModalSkeleton = ({ closeModal, children, handleCloseButton, currentPage }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.removeProperty('scroll');
    };
  }, [])

  return createPortal(
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        {children}
        {currentPage === 2 && handleCloseButton}
      </div>
    </>,
    document.querySelector('.myPortalModalDiv')
  )
}

export default ModalSkeleton;