import React from 'react'
import DropdownCSS from '../../assets/styles/Dropdown.module.css'

const Dropdown = ({ receivedValue = '', handleOnChange = {}, receivedOptionsList }) => {
  return (
    <select
      value={receivedValue}
      onChange={handleOnChange}
    >
      {receivedOptionsList.map((option, index) => {
        return (
          <option className={DropdownCSS.option} key={index} value={option.label}>{option.label}</option>
        )
      })}
    </select>
  )
}

export default Dropdown
