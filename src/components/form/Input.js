import React from 'react'
import InputCSS from '../../assets/styles/Input.module.css'

const Input = ({
  receivedAutoComplete = "off",
  receivedValue = '',
  receivedOnChange = '',
  receivedPlaceholder = 'Type Here...'
}) => {
  return (
    <input
      type="text"
      autoComplete={receivedAutoComplete}
      value={receivedValue}
      onChange={receivedOnChange}
      placeholder={receivedPlaceholder}
      className={InputCSS.inputElement}
    />
  )
}

export default Input
