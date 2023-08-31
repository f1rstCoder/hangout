import React from 'react'

const Dropdown = ({ receivedValue = '', handleOnChange = {}, receivedOptionsList }) => {
  return (
    <select
      value={receivedValue}
      onChange={handleOnChange}
    >
      {receivedOptionsList.map((option, index) => {
        return (
          <option key={index} value={option.value}>{option.label}</option>
        )
      })}
    </select>
  )
}

export default Dropdown
