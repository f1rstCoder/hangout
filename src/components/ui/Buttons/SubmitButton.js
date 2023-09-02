import React from 'react'
import SubmitBtnCSS from '../../../assets/styles/SubmitButton.module.css'

const SubmitButton = ({ submitButtonText, handleOnClickFunction = () => { }, disablingCondition = false }) => {
  return (
    <button onClick={handleOnClickFunction} disabled={disablingCondition} className={SubmitBtnCSS.btnStyle}>
      {submitButtonText}
    </button>
  )
}

export default SubmitButton
