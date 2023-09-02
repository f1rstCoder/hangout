import React, { useState, useEffect } from 'react'
import ModalLayout from '../ModalLayout';
import { getAxios } from '../../../lib/DefineAxiosGet';
import '../../../assets/styles/ShowFollowers.css'
import { handleFindAccount } from '../../../utils/Functions';
import NavigateButton from '../../ui/Buttons/NavigateButton';

const ShowFollowers = ({ id, closingFunction }) => {
  const [followers, setFollowers] = useState([])
  const [followerProfilePics, setFollowerProfilePics] = useState([])
  const [followersCount, setFollowersCount] = useState(0)

  const getProfilePic = followers => {
    getAxios(`http://localhost:3050/users`, {
      username: followers
    })
      .then(res => setFollowerProfilePics(oldVal => [...oldVal, res[0].profile_photo]))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getAxios(`http://localhost:3060/users/${id}`)
      .then(res => {
        setFollowersCount(res.followers.length)
        setFollowers([...res.followers])
        res.followers.forEach(follower => getProfilePic(follower))
      })
      .catch(err => console.error(err))
  }, [])

  const ShowFollowersContent = () => {
    return (
      <div className="displayProfileInfoDiv">
        {followers &&
          followers.map((follower, index) => {
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
      modalHeaderTitle={`Followers: ${followersCount}`}
      modalContent={ShowFollowersContent}
    />
  )
}

export default ShowFollowers
