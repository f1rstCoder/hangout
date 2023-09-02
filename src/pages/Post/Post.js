import React, { useState, useMemo, useEffect, useRef } from "react";
import "../../assets/styles/Post.css";
import {
  ThumbsupEmpty,
  ThumbsupFilled,
  Comments,
  BookmarkEmpty,
  BookmarkFilled,
  EmojiIcon,
  ChevronRight,
  TrashIcon
} from "../../assets/icons/PostsIcons";
import Slider from "../../components/Slider";
import TimeAgo from "../../components/TimeAgo";
import { getAxios } from "../../lib/DefineAxiosGet";
import { handleFindAccount } from "../../utils/Functions";
import SubmitButton from '../../components/ui/Buttons/SubmitButton';
import Textarea from "../../components/form/Textarea";
import { AuthorBar } from "../../components/AuthorBar";
import CommentsSection from "../CommentsSection/CommentsSection";
import ConfirmPostDelete from "../../components/Modals/SinglePageModals/ConfirmPostDelete";

const Post = ({ post, id, user }) => {
  const myPost = useMemo(() => (post), [])
  const images = require.context("../../assets/emojis/", false);
  const imageList = images.keys().map((image) => images(image));
  const [showComments, setShowComments] = useState(false);
  const [showDeletePostModal, setShowDeletePostModal] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const reactions = ["angry", "crying", "happy", "heart", "lol", "sad"];
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [savesCount, setSavesCount] = useState(post.saves);
  const [customComments, setCustomComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [incremented, setIncremented] = useState([]);
  const [commentsCount, setCommentsCount] = useState(post.comments.length)
  const [followerProfilePics, setFollowerProfilePics] = useState([])
  const [reactionCount, setReactionCount] = useState([])
  const postRef = useRef()
  const commentRef = useRef()
  const customCommentRef = useRef()

  const getProfilePic = authorName => {
    getAxios(`http://localhost:3050/users`, {
      username: authorName
    })
      .then(res => setFollowerProfilePics(oldVal => [...oldVal, res[0]?.profile_photo]))
      .catch(err => console.error(err))
  }

  const closeModalConfirmPostDelete = () => setShowDeletePostModal(false)

  useEffect(() => {
    getProfilePic(myPost.author)
    reactions.forEach(reaction => {
      setReactionCount(oldArray => [...oldArray, post.emoji_reactions[reaction]])
      setIncremented(oldArray => [...oldArray, false])
    })
  }, [])

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(likesCount - 1);
    } else {
      setLiked(true);
      setLikesCount(likesCount + 1);
    }
  };

  const handleSave = () => {
    if (saved) {
      setSaved(false);
      setSavesCount(savesCount - 1);
    } else {
      setSaved(true);
      setSavesCount(savesCount + 1);
    }
  };

  const [currentlySelectedEmoji, setCurrentlySelectedEmoji] = useState(-1);

  const updateReactionCount = (index, operationType) => {
    if (operationType === 'add')
      setReactionCount(currentReactionArray => {
        return [
          ...currentReactionArray.slice(0, index),
          currentReactionArray[index] + 1,
          ...currentReactionArray.slice(index + 1),
        ]
      })
    if (operationType === 'subtract')
      setReactionCount(currentReactionArray => {
        return [
          ...currentReactionArray.slice(0, index),
          currentReactionArray[index] - 1,
          ...currentReactionArray.slice(index + 1),
        ]
      })
  }

  const changeReactionCountVal = index => {
    if (currentlySelectedEmoji === -1) {
      updateReactionCount(index, 'add');
      setCurrentlySelectedEmoji(index)
    }
    else if (currentlySelectedEmoji === index) {
      updateReactionCount(index, 'subtract');
      setCurrentlySelectedEmoji(-1)
    }
    else {
      updateReactionCount(currentlySelectedEmoji, 'subtract');
      updateReactionCount(index, 'add');
      setCurrentlySelectedEmoji(index)
    }
    setShowEmojis(false)
  };

  const handleCommentPost = e => {
    e.preventDefault();
    const newComment = {
      author: post.author,
      date_commented: new Date(),
      content: commentContent,
    };
    setCustomComments((oldArray) => [...oldArray, newComment]);
    setCommentContent("");
    setCommentsCount(commentsCount + 1)
  };



  return (
    <div className="post" ref={postRef}>
      {showDeletePostModal &&
        <ConfirmPostDelete
          postRefVal={postRef}
          setShowDeletePostModal={setShowDeletePostModal}
          closingFunction={closeModalConfirmPostDelete}
        />}
      <div className="addingAuthorBarInPosts" >
        <div className="addingAuthorBarAndEditIconInPosts">
          <div className="firstPartAuthorBar">
            <AuthorBar
              profilePhotoURL={followerProfilePics[0]}
              authorName={post.author}
              byLineContent={<TimeAgo timestamp={post.date_posted} />}
              onClickAuthor={() => handleFindAccount(post.author)}
            />
          </div>
          {id === user &&
            <div className="secondPartEditIcon" onClick={() => setShowDeletePostModal(true)}>
              <TrashIcon />
            </div>
          }
        </div>
      </div>

      {post.media.length > 0 &&
        <Slider mediaFiles={post.media} />
      }

      <div className="content">{post.content}</div>
      <div className="impression">
        <div className="impressionType likes" onClick={handleLike}>
          <div className="svg">
            {liked ? <ThumbsupFilled /> : <ThumbsupEmpty />}
          </div>
          <div className="count">{likesCount}</div>
        </div>
        <div
          className="impressionType commentsCount"
          onClick={() => setShowComments(!showComments)}
        >
          <div className="svg">
            <Comments />
          </div>
          <div className="count">{customComments.length + post.comments.length}</div>
        </div>
        <div className="impressionType saves" onClick={handleSave}>
          <div className="svg">
            {saved ? <BookmarkFilled /> : <BookmarkEmpty />}
          </div>
        </div>
        <div className="impressionType emojiIcon" onClick={() => setShowEmojis(true)}>
          <div className="svg">
            {currentlySelectedEmoji === -1 ?
              <EmojiIcon />
              :
              <img
                src={imageList[currentlySelectedEmoji]}
                alt='Selected'
                className="reaction-emoji"
              />
            }
          </div>
        </div>
      </div>
      {
        showEmojis &&
        <div className="reactions">
          {reactions.map((reaction, index) => {
            return (
              <div
                className={`reaction ${reaction} ${currentlySelectedEmoji === index ? 'selected' : ''}`}
                onClick={() => changeReactionCountVal(index)}
              >
                <div className={`reaction-emoji-div `}>
                  <img
                    src={imageList[index]}
                    alt={reaction}
                    className="reaction-emoji"
                  />
                </div>
                <div className={`reaction-count`}>
                  {reactionCount[index]}
                </div>
              </div>
            );
          })}
        </div>
      }
      {
        showComments && (
          <div className="comments">
            <h2>Comments:</h2>
            <form className="commentsForm" onSubmit={handleCommentPost}>
              <div className="commentsFormDiv">
                {/* <textarea
              name=""
              placeholder="Add Comment..."
              className="textArea commentTextArea"
              rows="6"
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
            ></textarea> */}
                <div className="commetsFormTextarea">
                  <Textarea
                    receivedName='CommentTextArea'
                    receivedPlaceholder={"Type your comment..."}
                    receivedRows={6}
                    receivedValue={commentContent}
                    handleOnChange={e => setCommentContent(e.target.value)}
                  />
                </div>

                <div className="submitComment">
                  <SubmitButton
                    submitButtonText={<ChevronRight />}
                    disablingCondition={!commentContent.split(" ").join("")}
                  />
                </div>
              </div>
            </form>
            {customComments &&
              customComments
                .slice(0)
                .reverse()
                .map((comment, index) => {
                  return (
                    <CommentsSection
                      index={index}
                      comment={comment}
                      handleFindAccount={() => handleFindAccount(comment.author)}
                      getProfilePic={() => getProfilePic(comment.author)}
                      refVal={customCommentRef}
                    />
                  );
                })}
            {post.comments &&
              post.comments.map((comment, index) => {
                return (
                  <CommentsSection
                    index={index}
                    comment={comment}
                    handleFindAccount={() => handleFindAccount(comment.author)}
                    getProfilePic={() => getProfilePic(comment.author)}
                    refVal={commentRef}
                  />
                );
              })}
          </div>
        )
      }
    </div >
  );
};

export default Post;
