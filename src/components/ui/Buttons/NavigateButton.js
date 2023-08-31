import React from 'react'

const NavigateButton = ({ navigateButtonText, handleClickFunction = {}, disablingCondition = false }) => {
  return (
    <button onClick={handleClickFunction} disabled={disablingCondition}>
      {navigateButtonText}
    </button>
  )
}

export default NavigateButton
