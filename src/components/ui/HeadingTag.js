import React from 'react'

const HeadingTag = ({ type, tagTitle }) => {

  const HeadingTagType = type
  return (
    <div className='headingTag'>
      <HeadingTagType>{tagTitle}</HeadingTagType>
    </div>
  )
}

export default HeadingTag
