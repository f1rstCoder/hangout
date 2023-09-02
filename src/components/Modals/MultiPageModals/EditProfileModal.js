import React, { useState, useMemo } from 'react'
import ModalSkeleton from '../ModalSkeleton'
import '../../../assets/styles/EditProfileModal.css'
import { CloseIcon, BackIcon, ChevronRight } from '../../../assets/icons/PostsIcons';
import countryList from 'react-select-country-list'
import Input from '../../form/Input'
import Textarea from '../../form/Textarea';
import Calendar from '../../form/Calendar';
import Dropdown from '../../form/Dropdown';
import ModalLayoutCSS from '../../../assets/styles/ModalLayout.module.css'
import HeadingTag from '../../ui/HeadingTag';
import NavigateButton from '../../ui/Buttons/NavigateButton';
import SubmitButton from '../../ui/Buttons/SubmitButton';

const EditProfileModal = ({ currentData, closingFunction, editProfileData }) => {
  const [editProfileName, setEditProfileName] = useState(currentData[0])
  const [editProfileDOB, setEditProfileDOB] = useState(currentData[1])
  const [editProfileCity, setEditProfileCity] = useState(currentData[2])
  const [editProfileCountry, setEditProfileCountry] = useState(currentData[3])
  const [editProfileGender, setEditProfileGender] = useState(currentData[4])
  const [editProfileOccupation, setEditProfileOccupation] = useState(currentData[5])
  const [editProfileDescription, setEditProfileDescription] = useState(currentData[6])
  const CountriesApiList = useMemo(() => countryList().getData(), [])
  const [currentPage, setCurrentPage] = useState(1)
  console.log(CountriesApiList[0])
  const saveEditProfile = () => {
    if (editProfileName.length > 0) {
      editProfileData([
        editProfileName,
        editProfileDOB,
        editProfileCity,
        editProfileCountry,
        editProfileGender,
        editProfileOccupation,
        editProfileDescription
      ])
      closingFunction()
    }
  }

  const genderDropdown = [
    { label: 'Male' },
    { label: 'Female' },
    { label: 'Other' },
    { label: 'Prefer not to disclose' },
  ]

  const HandleCloseButton = () => {
    return (
      <SubmitButton
        submitButtonText={"Save Edit"}
        handleOnClickFunction={saveEditProfile}
      />
    )
  }

  return (
    <ModalSkeleton closeModal={closingFunction}>
      <div className={ModalLayoutCSS.modalHeadingDiv}>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="navDivLeftDiv">
            {currentPage !== 0 &&
              <div onClick={() => setCurrentPage(pageVal => pageVal - 1)}>
                <BackIcon color="white" />
              </div>
            }
          </div>
        </div>
        <div className={ModalLayoutCSS.modalHeader}>
          <HeadingTag type='h2' tagTitle={`Edit ${currentPage}/2`} />
        </div>
        <div className={ModalLayoutCSS.modalNavDiv}>
          <div className="closingFunctionDiv" onClick={closingFunction}>
            <CloseIcon color={"currentColor"} />
          </div>
        </div>
      </div>

      <div className={ModalLayoutCSS.modalContent}>
        <form className='editProfileForm'>
          {currentPage === 1 &&
            <div className='editProfilePageOne'>
              <div className="editFormComponent">
                <label htmlFor="editProfileName">
                  <h2>Name: {!editProfileName.length ? "Required" : ''}</h2>
                </label>
                <Input
                  receivedValue={editProfileName}
                  receivedOnChange={e => setEditProfileName(e.target.value)}
                  receivedPlaceholder='Name is Required...'
                />
              </div>
              <div className="editFormComponent">
                <label htmlFor="editProfileDOB">
                  <h2>Date of Birth: {editProfileDOB}</h2>
                </label>
                <Calendar
                  receivedValue={editProfileDOB}
                  handleOnChange={e => setEditProfileDOB(e.target.value)}
                  receivedAutoComplete='off'
                />
              </div>
              <div className="editFormComponent">
                <label htmlFor="editProfileGender">
                  <h2>Gender:</h2>
                </label>
                <Dropdown
                  receivedValue={editProfileGender}
                  handleOnChange={e => setEditProfileGender(e.target.value)}
                  receivedOptionsList={genderDropdown}
                />
              </div>
              <div className="editFormComponent">
                <label htmlFor="editProfileOccuptation">
                  <h2>Occupation:</h2>
                </label>
                <Input
                  receivedValue={editProfileOccupation}
                  receivedOnChange={e => setEditProfileOccupation(e.target.value)}
                  receivedPlaceholder='What do you do???'
                />
              </div>
            </div>
          }
          {currentPage === 2 &&
            <div className='editProfilePageOne'>
              <div className="editFormComponent">
                <label htmlFor="editProfileCity">
                  <h2>City of Residence:</h2>
                </label>
                <Input
                  receivedValue={editProfileCity}
                  receivedOnChange={e => setEditProfileCity(e.target.value)}
                  receivedPlaceholder='Your city have a name???'
                />
              </div>
              <div className="editFormComponent">
                <label htmlFor="editProfileCountry">
                  <h2>Country:</h2>
                </label>
                <Dropdown
                  receivedValue={editProfileCountry}
                  handleOnChange={e => setEditProfileCountry(e.target.value)}
                  receivedOptionsList={CountriesApiList}
                />
              </div>
              <div className="editFormComponent">
                <label htmlFor="editProfileDescription">
                  <h2>My Introduction:</h2>
                </label>
                <Textarea
                  receivedName='NewPostTextArea'
                  receivedPlaceholder={"Type a short intro..."}
                  receivedRows={5}
                  receivedValue={editProfileDescription}
                  handleOnChange={e => setEditProfileDescription(e.target.value)}
                />
              </div>
            </div>
          }
        </form>
      </div >

      {/* Modal Footer */}
      < div className={ModalLayoutCSS.modalFooter} >
        {currentPage === 1 ?
          <div>
            <NavigateButton
              navigateButtonText={<ChevronRight />}
              handleClickFunction={() => setCurrentPage(oldPageVal => oldPageVal + 1)}
              disablingCondition={currentPage == 2}
            />
          </div>
          :
          < HandleCloseButton />
        }
      </ div>
    </ModalSkeleton >
  )
}

export default EditProfileModal
