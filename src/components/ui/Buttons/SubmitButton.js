import React from 'react'

const SubmitButton = ({ submitButtonText, handleOnClickFunction = () => { }, disablingCondition = false }) => {
  return (
    <button onClick={handleOnClickFunction} disabled={disablingCondition}>
      {submitButtonText}
    </button>
  )
}

export default SubmitButton
