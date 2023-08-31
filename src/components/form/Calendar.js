import React from 'react'

const Calendar = ({ receivedValue = '', handleOnChange = {}, receivedAutoComplete = 'off' }) => {
  return (
    <input
      type="date"
      value={receivedValue}
      onChange={handleOnChange}
      autoComplete={receivedAutoComplete}
    />
  )
}

export default Calendar
