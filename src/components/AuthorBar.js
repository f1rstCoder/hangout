import React from 'react'
import AuthorBarCSS from '../assets/styles/AuthorBar.module.css'
import PhotoCSS from '../assets/styles/Photos.module.css'

export const AuthorBar = ({ profilePhotoURL = '', authorName = '', byLineContent = '', type = '', onClickAuthor = () => { } }) => {
  const finalByLineContent = ''
  return (
    <div className={AuthorBarCSS.authorBar}>
      <div className={AuthorBarCSS.authorBarContent}>
        {type !== 'comment' &&
          <div className={AuthorBarCSS.profilePhotoDiv} onClick={onClickAuthor}>
            <ProfilePhoto profilePhotoURL={profilePhotoURL} />
          </div>
        }
        <div className={AuthorBarCSS.authorBarContentDiv}>
          <div className={AuthorBarCSS.authorNameDiv} onClick={onClickAuthor}>
            {authorName}
          </div>
          <div className={AuthorBarCSS.byLineDiv}>
            {byLineContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export const ProfilePhoto = ({ profilePhotoURL }) => {
  return (
    <img src={profilePhotoURL} alt="" className={PhotoCSS.profilePhoto} />
  )
}
