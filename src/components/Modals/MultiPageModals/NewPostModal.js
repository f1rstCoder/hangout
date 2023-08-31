import React, { useState } from 'react'
import ModalSkeleton from '../ModalSkeleton'
import { useDispatch } from 'react-redux';
import { setPosts } from '../../../context/data/dataSlice'
import '../../../assets/styles/NewPostModal.css'
import JoditEditor from 'jodit-react';
import { CloseIcon, ImageIcon, BackIcon, ChevronRight } from '../../../assets/icons/PostsIcons';
import { getAxios } from '../../../lib/DefineAxiosGet';
import NavigateButton from '../../ui/Buttons/NavigateButton';
import SubmitButton from '../../ui/Buttons/SubmitButton';
import Textarea from '../../form/Textarea';

const NewPostModal = ({ closingFunction }) => {
  const [media, setMedia] = useState([])
  const [postContent, setPostContent] = useState('')
  const id = localStorage.getItem('id')
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)

  const onMediaChange = event => {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const newObj = URL.createObjectURL(event.target.files[i])
        setMedia(oldArray => [...oldArray, newObj]);
        URL.revokeObjectURL(event.target.files[i])
      }
    }
  }

  const getTheProfilePicAndName = () => {
    getAxios(`http://localhost:3050/users`, { id: id })
      .then(res => {
        uploadPost(res[0].username)
      })
      .catch(err => console.error(err))
  }

  const removeMediaFunc = index => {
    setMedia([
      ...media.slice(0, index),
      ...media.slice(index + 1, media.length)
    ]);
  }

  const uploadPost = newPostAuthor => {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const date = currentDate.getDate()
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    dispatch(setPosts({
      "author": newPostAuthor,
      "content": postContent,
      "media": media,
      "date_posted": new Date(),
      "likes": 0,
      "emoji_reactions": {
        "happy": 0,
        "sad": 0,
        "angry": 0,
        "lol": 0,
        "confused": 0,
        "heart": 0,
        "crying": 0
      },
      "shares": 0,
      "saves": 0,
      "favorites": 0,
      "comments": [],
      "is_deleted_post": false
    }))
    closingFunction()
  }
  const handleCloseButton = (
    <SubmitButton
      submitButtonText={"Post"}
      handleOnClickFunction={() => getTheProfilePicAndName(id)}
      disablingCondition={!media.length && !postContent.split(" ").join("")}
    />
  )

  return (
    <ModalSkeleton closeModal={closingFunction} handleCloseButton={handleCloseButton} currentPage={currentPage}>
      <div className="postHeading">
        {currentPage === 2 &&
          <div className="modalTopBtn" onClick={() => setCurrentPage(1)}>
            <BackIcon color={"white"} />
          </div>
        }
        <h2 className='postTitle'>Create A New Post</h2>
        <div className="modalTopBtn" onClick={closingFunction}>
          <CloseIcon color={"white"} />
        </div>
      </div>
      <form>
        {currentPage === 1 &&
          <>
            {media.length === 0 &&
              <div className="postTypeDiv">
                <h3 className='postTypeTitle'>Upload Media</h3>
              </div>
            }
            {media.length !== 0 &&
              <div className="displayMedia">

                {media.map((medium, index) =>
                  <div className='postImgDiv'>
                    <div className="removeImgBtn" onClick={() => removeMediaFunc(index)}>
                      <CloseIcon color={"black"} />
                    </div>
                    <img src={medium} alt="" className='postImg' key={index} />
                  </div>
                )
                }
              </div>
            }

            <div className="addMedia page1">
              <div>
                <label htmlFor="addImg">
                  <ImageIcon />
                </label>
                <input
                  type='file'
                  accept="image/*"
                  id="addImg"
                  onChange={onMediaChange}
                  multiple
                />
              </div>
              <div>
                <NavigateButton
                  navigateButtonText={<ChevronRight />}
                  handleClickFunction={() => setCurrentPage(2)}
                />
              </div>
            </div>
            {/* <div>
                <label htmlFor="addVideo">
                  <VideoIcon />
                </label>
                <input
                  type='file'
                  accept="video/*"
                  id="addVideo"
                  onChange={onMediaChange}
                  multiple
                />
              </div> */}

          </>
        }
        {currentPage !== 1 &&
          <>
            <div className="editor">
              {/* <JoditEditor
            ref={editor}
            value={postContent}
            tabIndex={1}
            onChange={newContent => setPostContent(newContent)}
          /> */}
              {/* <textarea
                name="NewPostTextArea"
                className='textArea newPostTextArea'
                rows={15}
                value={postContent}
                onChange={e => setPostContent(e.target.value)}
              >
              </textarea> */}
              <Textarea
                receivedName='NewPostTextArea'
                receivedPlaceholder={"Chat with your buddy..."}
                receivedRows={15}
                receivedValue={postContent}
                handleOnChange={e => setPostContent(e.target.value)}
              />
            </div>
          </>
        }
      </form>
    </ModalSkeleton >
  )
}

export default NewPostModal
