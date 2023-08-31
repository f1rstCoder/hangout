import React from 'react'

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
    />
  )
}

export default Input
