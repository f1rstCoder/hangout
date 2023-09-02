import React from 'react'
import InputCSS from '../../assets/styles/Input.module.css'

const Calendar = ({ receivedValue = '', handleOnChange = {}, receivedAutoComplete = 'off' }) => {
  return (
    <input
      type="date"
      value={receivedValue}
      onChange={handleOnChange}
      autoComplete={receivedAutoComplete}
      className={InputCSS.inputStyle}
    />
  )
}

export default Calendar
