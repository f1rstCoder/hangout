import React from 'react'
import { AuthorBar } from "../../components/AuthorBar";
import TimeAgo from "../../components/TimeAgo";
import CommentsSectionCSS from '../../assets/styles/CommentsSection.module.css'

const CommentsSection = ({ comment, index, handleFindAccount, getProfilePic, refVal = '' }) => {
  return (
    <div className={CommentsSectionCSS.comment} key={index} ref={refVal}>
      <div
        className={CommentsSectionCSS.addingAuthorBarInComments}
        onClick={() => handleFindAccount(comment.author)}
      >
        <AuthorBar
          profilePhotoURL={() => getProfilePic(comment.author)}
          authorName={comment.author}
          byLineContent={<TimeAgo timestamp={comment.date_commented} />}
          type='comment'
        />
      </div>
      {comment.content && (
        <div className={CommentsSectionCSS.content}>{comment.content}</div>
      )}
    </div>
  )
}

export default CommentsSection
