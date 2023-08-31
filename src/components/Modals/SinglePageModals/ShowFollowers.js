import React from 'react'
import ModalSkeleton from '../ModalSkeleton'
import '../../../assets/styles/ShowFollowers.css'
import useFetchProfilePic from '../../../hooks/useFetchProfilePic';
import useFetchFollowers from '../../../hooks/useFetchFollowers';
import { CloseIcon } from '../../../assets/icons/PostsIcons';
import { handleFindAccount } from '../../../utils/Functions';
import NavigateButton from '../../ui/Buttons/NavigateButton';
import ModalLayout from '../ModalLayout';

const ShowFollowers = ({ id, closingFunction }) => {
  const { followersList, followersCount } = useFetchFollowers(id)
  const { followerProfilePics } = useFetchProfilePic(followersList);
  console.log(followersList)
  const handleCloseButton = (
    <div className="buttonClose">
      <NavigateButton
        navigateButtonText={"Close"}
        handleClickFunction={closingFunction}
      />
    </div>
  )

  const ShowFollowersContent = () => {
    <div className="displayProfileInfoDiv">
      {
        followersList?.map((follower, index) => {
          return (
            <div className="displayProfileInfo" onClick={() => handleFindAccount(follower)}>
              Hello {index}
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
  }
  return (
    <ModalLayout
      closeModal={closingFunction}
      handleCloseButton={handleCloseButton}
      currentPage={1}
      modalHeaderTitle={`Followers: ${followersCount}`}
      modalContent={ShowFollowersContent}
    />
  )
}

export default ShowFollowers
