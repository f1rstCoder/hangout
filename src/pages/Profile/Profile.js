import React, { useState, useEffect } from 'react'
import '../../assets/styles/Profile.css'
import Feeds from '../Feeds/Feeds';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import NewPostModal from '../../components/Modals/MultiPageModals/NewPostModal'
import useFetchUserData from '../../hooks/useFetchUserData';
import useFetchUserPosts from '../../hooks/useFetchUserPosts';
import ShowFollowers from '../../components/Modals/SinglePageModals/ShowFollowers';
import ShowFollowing from '../../components/Modals/SinglePageModals/ShowFollowing';
import { Link } from 'react-router-dom';
import EditProfileModal from '../../components/Modals/MultiPageModals/EditProfileModal';
import FloatingButton from '../../components/ui/Buttons/FloatingButton';
import { Message } from '../../assets/icons/PostsIcons';
import { setPostCount } from '../../context/data/dataSlice';

const Profile = () => {
  const { id } = useParams()
  const user = localStorage.getItem('id')
  const { data } = useFetchUserData(id)
  // const tags = data.describe_yourself_tags - For later versions
  const { posts } = useFetchUserPosts(id)
  const newPosts = useSelector((state) => state.data.posts)
  const [showNewPostModal, setShowNewPostModal] = useState(false)
  const [showFollowingModal, setShowFollowingModal] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)

  const closeModalNewPost = () => setShowNewPostModal(false)
  const closeModalFollowing = () => setShowFollowingModal(false)
  const closeModalFollowers = () => setShowFollowersModal(false)
  const closeModalEditProfile = () => setShowEditProfileModal(false)

  const [category, setCategory] = useState([])
  useEffect(() => {
    setCategory([
      data.name,
      data.date_of_birth,
      data.city,
      data.country,
      data.gender,
      data.occupation,
      data.description
    ])
  }, [data])
  const categoryTitle = ['Name', 'Date of Birth', 'City of Residence', 'Country', 'Gender', 'Occupation']

  const handleEditProfileModalCallback = editedProfileData => setCategory(editedProfileData)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [newPosts]);

  return (
    <div className='profile'>
      <div className="heading">
        <div className="bannerImgDiv">
          <img src={data.banner_photo} alt="Banner Pic" className="dataImgs bannerImg" />
        </div>
        <div className="profileImgDiv">
          <img src={data.profile_photo} alt="Profile Pic" className='dataImgs profileImg' />
        </div>
        <div className="usernameDisplay">
          {data.username}
        </div>
        <div className="line"></div>
        <div className="profilePanel">
          {user === id &&
            <div className="editIcon">
              <div className="editText" onClick={() => setShowEditProfileModal(true)}>
                Edit
              </div>
            </div>
          }
          <div className="editIcon">
            <div className="editText" onClick={() => setShowFollowersModal(true)}>
              Followers
            </div>
          </div>
          <div className="editIcon">
            <div className="editText" onClick={() => setShowFollowingModal(true)}>
              Following
            </div>
          </div>
        </div>
        <div className="detailsList">
          {
            category.map((item, index) => {
              return (
                item && index < 6 &&
                <div className="generalInfo" key={index}>
                  <p className="title">{categoryTitle[index]}: </p>
                  <p className="detail">{item}</p>
                </div>
              )
            })
          }
        </div>
        <div className="intro">
          <p className='introTitle'>
            My Introduction
          </p>
          {category[6]}
        </div>

        <div className="numOfPosts">
          Posts: {newPosts?.length + posts?.length}
        </div>
        {showNewPostModal && <NewPostModal closingFunction={closeModalNewPost} />}
        {showFollowersModal && <ShowFollowers id={id} closingFunction={closeModalFollowers} />}
        {showFollowingModal && <ShowFollowing id={id} closingFunction={closeModalFollowing} />}
        {showEditProfileModal &&
          <EditProfileModal
            currentData={category}
            closingFunction={closeModalEditProfile}
            editProfileData={handleEditProfileModalCallback}
          />
        }
        {user !== id ?
          <Link
            to={`/dm/${data.username}`}
            state={{ "username": data.username, "imgSrc": data.profile_photo }}
          >
            <FloatingButton
              floatingButtonText={<Message />}
              handleClickFunction={() => setShowNewPostModal(true)}
            />
          </Link>
          :
          <FloatingButton
            floatingButtonText={'+'}
            handleClickFunction={() => setShowNewPostModal(true)}
          />
        }

      </div>
      <Feeds
        newPosts={newPosts}
        posts={posts}
        id={id}
        user={user}
      />
    </div >
  )
}

export default Profile
