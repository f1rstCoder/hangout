import React from 'react'
import FloatingButtonCSS from '../../../assets/styles/FloatingButton.module.css'

const FloatingButton = ({ floatingButtonText, handleClickFunction = {} }) => {
    return (
        <button onClick={handleClickFunction} className={FloatingButtonCSS.btnStyle}>
            {floatingButtonText}
        </button>
    )
}

export default FloatingButton
