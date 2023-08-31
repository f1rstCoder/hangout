import React from 'react'
import TextAreaCSS from '../../assets/styles/Textarea.module.css'
const Textarea = ({
  receivedName = '',
  receivedPlaceholder = "Start Typing Here...",
  receivedRows = 5,
  receivedValue = '',
  handleOnChange = {}
}) => {
  return (
    <textarea
      name={receivedName}
      placeholder={receivedPlaceholder}
      rows={receivedRows}
      cols='120'
      value={receivedValue}
      onChange={handleOnChange}
      className={TextAreaCSS.textarea}
    >
    </textarea>
  )
}

export default Textarea
