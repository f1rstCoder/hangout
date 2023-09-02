import React from 'react'
import ModalLayout from '../ModalLayout'
import NavigateButton from '../../ui/Buttons/NavigateButton'
import SubmitButton from '../../ui/Buttons/SubmitButton'

const ConfirmPostDelete = ({ postRefVal, setShowDeletePostModal, closingFunction }) => {

  const handleDeletePost = () => {
    const postToBeDeleted = postRefVal.current
    if (postToBeDeleted) {
      postToBeDeleted.style.display = 'none'
    }
    setShowDeletePostModal(false)
  }

  const ConfirmPostDeleteContent = () => {
    return (
      <div>
        <p>This is a permanent action and cannot be revoked or repeated.</p>
        <p>Do you wish to proceed?</p>
      </div>
    )
  }

  const ConfirmPostDeleteFooter = () => {
    return (
      <div className="addMedia page1">
        <div>
          <SubmitButton
            submitButtonText={'Cancel'}
            handleOnClickFunction={() => setShowDeletePostModal(false)}
          />
        </div>
        <div>
          <SubmitButton
            submitButtonText={'Delete'}
            handleOnClickFunction={handleDeletePost}
          />
        </div>
      </div>
    )
  }

  return (
    <ModalLayout
      closeModal={closingFunction}
      modalHeaderTitle={`Delete Post ?`}
      modalContent={ConfirmPostDeleteContent}
      modalFooterData={ConfirmPostDeleteFooter}
    />
  )
}

export default ConfirmPostDelete
