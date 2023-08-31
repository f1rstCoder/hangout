import React from 'react'

const FloatingButton = ({ floatingButtonText, handleClickFunction = {} }) => {
    return (
        <button onClick={handleClickFunction}>
            {floatingButtonText}
        </button>
    )
}

export default FloatingButton
