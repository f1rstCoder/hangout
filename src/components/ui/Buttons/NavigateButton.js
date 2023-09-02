import React from 'react'
import NavigateButtonCSS from '../../../assets/styles/NavigateButton.module.css'

const NavigateButton = ({ navigateButtonText, handleClickFunction = {}, disablingCondition = false }) => {
  return (
    <button onClick={handleClickFunction} disabled={disablingCondition} className={NavigateButtonCSS.btnStyle}>
      {navigateButtonText}
    </button>
  )
}

export default NavigateButton
