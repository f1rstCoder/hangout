import { useEffect } from "react";
import React from "react";
import { createPortal } from "react-dom";

const ModalSkeleton = ({ closeModal, children }) => {
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
      </div>
    </>,
    document.querySelector('.myPortalModalDiv')
  )
}

export default ModalSkeleton;