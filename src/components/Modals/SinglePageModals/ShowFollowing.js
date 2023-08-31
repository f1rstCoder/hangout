import React, { useState, useEffect } from 'react'
import ModalLayout from '../ModalLayout';
import { getAxios } from '../../../lib/DefineAxiosGet';
import '../../../assets/styles/ShowFollowing.css'
import { handleFindAccount } from '../../../utils/Functions';
import NavigateButton from '../../ui/Buttons/NavigateButton';

const ShowFollowing = ({ id, closingFunction }) => {
  const [following, setFollowing] = useState([])
  const [followerProfilePics, setFollowerProfilePics] = useState([])
  const [followingCount, setFollowingCount] = useState(0)

  const getProfilePic = following => {
    getAxios(`http://localhost:3050/users`, {
      username: following
    })
      .then(res => setFollowerProfilePics(oldVal => [...oldVal, res[0].profile_photo]))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getAxios(`http://localhost:3061/users/${id}`)
      .then(res => {
        setFollowingCount(res.accounts_following.length)
        setFollowing([...res.accounts_following])
        res.accounts_following.forEach(following => getProfilePic(following))
      })
      .catch(err => console.error(err))
  }, [])

  const handleCloseButton = (
    <div className="buttonClose">
      <NavigateButton
        navigateButtonText={"Close"}
        handleClickFunction={closingFunction}
      />
    </div>
  )

  const ShowFollowingContent = () => {
    return (
      <div className="displayProfileInfoDiv">
        {following &&
          following.map((follower, index) => {
            return (
              <div className="displayProfileInfo" onClick={() => handleFindAccount(follower)}>
                <div className="profilePhotoDiv">
                  <img src={followerProfilePics[index]} alt="" className='profilePic' key={index} />
                </div>
                <div className="profileNameDiv">
                  {follower}
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <ModalLayout
      closeModal={closingFunction}
      handleCloseButton={handleCloseButton}
      currentPage={1}
      modalHeaderTitle={`Following: ${followingCount}`}
      modalContent={ShowFollowingContent}
    />
  )
}

export default ShowFollowing
