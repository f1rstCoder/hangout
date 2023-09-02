import React, { useState, useRef } from 'react'
import ModalSkeleton from '../ModalSkeleton'
import { useDispatch } from 'react-redux';
import { setPosts } from '../../../context/data/dataSlice'
import '../../../assets/styles/NewPostModal.css'
import JoditEditor from 'jodit-react';
import { CloseIcon, ImageIcon, BackIcon, ChevronRight, VideoIcon } from '../../../assets/icons/PostsIcons';
import { getAxios } from '../../../lib/DefineAxiosGet';
import NavigateButton from '../../ui/Buttons/NavigateButton';
import SubmitButton from '../../ui/Buttons/SubmitButton';
import Textarea from '../../form/Textarea';
import ModalLayoutCSS from '../../../assets/styles/ModalLayout.module.css'
import HeadingTag from '../../ui/HeadingTag';

const NewPostModal = ({ closingFunction }) => {
  // const [mediaPhoto, setMediaPhoto] = useState([])
  // const [mediaVideo, setMediaVideo] = useState([])
  const [media, setMedia] = useState([])
  const [postContent, setPostContent] = useState('')
  const id = localStorage.getItem('id')
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1)
  const newPostImgInputRef = useRef(null);
  const newPostVideoInputRef = useRef(null);

  const onMediaChange = event => {
    if (event.target.files) {
      console.log(event.target.files)
      for (let i = 0; i < event.target.files.length; i++) {
        const newObj = URL.createObjectURL(event.target.files[i])
        // if (event.target.files[i].type.slice(0, 5) === 'image') {
        //   setMediaPhoto(oldArray => [...oldArray, {mediaFile: newObj, type:'image'}]);
        // } else {
        //   setMediaVideo(oldArray => [...oldArray, newObj])
        // }
        setMedia(oldArray => [...oldArray, newObj])
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
  const HandleCloseButton = () => {
    return (
      <SubmitButton
        submitButtonText={"Post"}
        handleOnClickFunction={() => getTheProfilePicAndName(id)}
        disablingCondition={!media.length && !postContent.split(" ").join("")}
      />
    )
  }

  return (
    <ModalSkeleton closeModal={closingFunction} >
      <div className={ModalLayoutCSS.modalHeadingDiv}>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="navDivLeftDiv">
            {currentPage === 2 &&
              <div onClick={() => setCurrentPage(pageVal => pageVal - 1)}>
                <BackIcon color="white" />
              </div>
            }
          </div>
        </div>
        <div className={ModalLayoutCSS.modalHeader}>
          <HeadingTag type='h2' tagTitle='Create Post' />
        </div>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="closingFunctionDiv" onClick={closingFunction}>
            <CloseIcon color={"currentColor"} />
          </div>
        </div>
      </div>

      <div className={ModalLayoutCSS.modalContent}>
        <form className='newPostForm'>
          {currentPage === 1 &&
            <>
              {media.length === 0 ?
                <div className="postTypeDiv">
                  <h3 className='postTypeTitle'>Wish to Upload any Media? (optional)</h3>
                </div>
                :
                media.length !== 0 &&
                <div className="displayMedia">
                  {media.map((medium, index) =>
                    <div className='postImgDiv'>
                      <div className="removeImgBtn" onClick={() => removeMediaFunc(index)}>
                        <CloseIcon color={"black"} />
                      </div>
                      {/* {medium.type == 'video/mp4' ?
                        <video controls>
                          <source src={medium} id="video_here" />
                          Your browser does not support HTML5 video.
                        </video>
                        :
                        // <img src={medium} alt="" className='postImg' key={index} />'
                      } */}
                      <img src={medium} alt="" className='postImg' key={index} />
                    </div>
                  )
                  }
                </div>
              }
            </>
          }
          {currentPage === 2 &&
            <>
              <div className="editor">
                <Textarea
                  receivedName='NewPostTextArea'
                  receivedPlaceholder={"Some text...??? And sorry, but this is not optional :("}
                  receivedRows={15}
                  receivedValue={postContent}
                  handleOnChange={e => setPostContent(e.target.value)}
                />
              </div>
            </>
          }
        </form>
      </div>

      {/* Modal Footer */}
      <div className={ModalLayoutCSS.modalFooter}>
        {currentPage === 1 &&
          <div className="addMedia page1">
            <div>
              <label htmlFor="addImg">
                <NavigateButton
                  navigateButtonText={<ImageIcon />}
                  handleClickFunction={() => newPostImgInputRef.current.click()}
                />
              </label>
              <input
                type='file'
                accept="image/*"
                id="addImg"
                onChange={onMediaChange}
                multiple
                className='hideInput'
                ref={newPostImgInputRef}
              />
            </div>
            {/* <div>
              <label htmlFor="addVideo">
                <NavigateButton
                  navigateButtonText={<VideoIcon />}
                  handleClickFunction={() => newPostVideoInputRef.current.click()}
                />
              </label>
              <input
                type='file'
                accept="video/*"
                id="addVideo"
                onChange={onMediaChange}
                multiple
                className='hideInput'
                ref={newPostVideoInputRef}
              />
            </div> */}
            <div>
              <NavigateButton
                navigateButtonText={<ChevronRight />}
                handleClickFunction={() => setCurrentPage(2)}
              />
            </div>
          </div>
        }
        {currentPage === 2 &&
          < HandleCloseButton />
        }
      </div>
    </ModalSkeleton >
  )
}

export default NewPostModal
