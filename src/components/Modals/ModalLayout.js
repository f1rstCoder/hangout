import React, { useState, useEffect } from 'react'
import ModalSkeleton from './ModalSkeleton'
import { CloseIcon } from '../../assets/icons/PostsIcons';
import ModalLayoutCSS from '../../assets/styles/ModalLayout.module.css'
import HeadingTag from '../ui/HeadingTag';
import EmptyFragment from '../EmptyFragment';

const ModalLayout = ({
  closeModal,
  handleCloseButton,
  currentPage = 1,
  modalHeaderTitle,
  modalNavDivLeft: ModalNavDivLeft = EmptyFragment,
  modalContent: ModalContent = EmptyFragment,
  modalFooterData: ModalFooterData = EmptyFragment,
}) => {

  return (
    <ModalSkeleton closeModal={closeModal} handleCloseButton={handleCloseButton} currentPage={currentPage}>
      {/* Modal Header */}
      <div className={ModalLayoutCSS.modalHeadingDiv}>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="navDivLeftDiv">
            <ModalNavDivLeft />
          </div>
        </div>
        <div className={ModalLayoutCSS.modalHeader}>
          <HeadingTag type='h2' tagTitle={modalHeaderTitle} />
        </div>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="closingFunctionDiv" onClick={closeModal}>
            <CloseIcon color={"currentColour"} />
          </div>
        </div>
      </div>

      {/* Modal Content */}
      <div className={ModalLayoutCSS.modalContent}>
        <ModalContent />
      </div>

      {/* Modal Footer */}
      <div className={ModalLayoutCSS.modalFooter}>
        <ModalFooterData />
      </div>
    </ModalSkeleton>
  )
}

export default ModalLayout
