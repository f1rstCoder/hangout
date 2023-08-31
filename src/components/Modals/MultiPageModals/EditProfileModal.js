import React, { useState, useMemo } from 'react'
import ModalSkeleton from '../ModalSkeleton'
import '../../../assets/styles/EditProfileModal.css'
import { CloseIcon } from '../../../assets/icons/PostsIcons';
import countryList from 'react-select-country-list'
import Input from '../../form/Input'
import Textarea from '../../form/Textarea';
import Calendar from '../../form/Calendar';
import Dropdown from '../../form/Dropdown';

const EditProfileModal = ({ currentData, closingFunction, editProfileData }) => {
  const [editProfileCurrentPage, setEditProfileCurrentPage] = useState(0)
  const [editProfileName, setEditProfileName] = useState(currentData[0])
  const [editProfileDOB, setEditProfileDOB] = useState(currentData[1])
  const [editProfileCity, setEditProfileCity] = useState(currentData[2])
  const [editProfileCountry, setEditProfileCountry] = useState(currentData[3])
  const [editProfileGender, setEditProfileGender] = useState(currentData[4])
  const [editProfileOccupation, setEditProfileOccupation] = useState(currentData[5])
  const [editProfileDescription, setEditProfileDescription] = useState(currentData[6])
  const CountriesApiList = useMemo(() => countryList().getData(), [])

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
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'Prefer not to disclose', label: 'Prefer not to disclose' },
  ]
  return (
    <ModalSkeleton closeModal={closingFunction} currentPage={2}>
      <div className="postHeading">
        <div className="modalTopBtn" onClick={closingFunction}>
          <CloseIcon color={"white"} />
        </div>
        <h2 className='postTitle'>Edit Profile {editProfileCurrentPage + 1}/3</h2>

        {editProfileCurrentPage === 2 &&
          <div className="modalTopBtn saveEditProfile" onClick={saveEditProfile}>
            Save
          </div>
        }
      </div>
      <form className='editProfileForm'>
        {editProfileCurrentPage === 0 &&
          <div className='editProfilePageOne'>
            <label htmlFor="editProfileName">
              <h2>Name: {!editProfileName.length ? "Required" : ''}</h2>
            </label>
            {/* <input
              id="editProfileName"
              type="text"
              value={editProfileName}
              onChange={e => setEditProfileName(e.target.value)}
              autoComplete='off'
            /> */}

            <Input
              receivedValue={editProfileName}
              receivedOnChange={e => setEditProfileName(e.target.value)}
              receivedPlaceholder='Name is Required...'
            />
            <label htmlFor="editProfileDOB">
              <h2>Date of Birth:</h2>
            </label>
            <h3>{editProfileDOB}</h3>
            {/* <input
              id="editProfileDOB"
              type="date"
              value={editProfileDOB}
              onChange={e => setEditProfileDOB(e.target.value)}
              autoComplete='off'
            /> */}
            <Calendar
              receivedValue={editProfileDOB}
              handleOnChange={e => setEditProfileDOB(e.target.value)}
              receivedAutoComplete='off'
            />

            <label htmlFor="editProfileGender">
              <h2>Gender:</h2>
            </label>
            {/* <select value={editProfileGender} onChange={e => setEditProfileGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to disclose">Prefer not to disclose</option>
            </select> */}
            <Dropdown
              receivedValue={editProfileGender}
              handleOnChange={e => setEditProfileGender(e.target.value)}
              receivedOptionsList={genderDropdown}
            />
          </div>
        }
        {editProfileCurrentPage === 1 &&
          <div className='editProfilePageTwo'>
            <label htmlFor="editProfileOccuptation">
              <h2>Occupation:</h2>
            </label>
            {/* <input
              id="editProfileOccuptation"
              type="text"
              value={editProfileOccupation}
              onChange={e => setEditProfileOccupation(e.target.value)}
              autoComplete='off'
            /> */}
            <Input
              receivedValue={editProfileOccupation}
              receivedOnChange={e => setEditProfileOccupation(e.target.value)}
              receivedPlaceholder='What do you do???'
            />
            <label htmlFor="editProfileCity">
              <h2>City of Residence:</h2>
            </label>
            {/* <input
              id="editProfileCity"
              type="text"
              value={editProfileCity}
              onChange={e => setEditProfileCity(e.target.value)}
              autoComplete='off'
            /> */}
            <Input
              receivedValue={editProfileCity}
              receivedOnChange={e => setEditProfileCity(e.target.value)}
              receivedPlaceholder='Your city have a name???'
            />
            <label htmlFor="editProfileCountry">
              <h2>Country:</h2>
            </label>
            {/* <select value={editProfileCountry} onChange={e => setEditProfileCountry(e.target.value)} id="editProfileCountry">
              {CountriesApiList.map((country, index) => {
                return (
                  <option key={index} value={country.value}>{country.label}</option>
                )
              })}
            </select> */}
            <Dropdown
              receivedValue={editProfileCountry}
              handleOnChange={e => setEditProfileCountry(e.target.value)}
              receivedOptionsList={CountriesApiList}
            />
          </div>
        }
        {
          editProfileCurrentPage === 2 &&
          <>
            <label htmlFor="editProfileDescription">
              <h2>My Introduction:</h2>
            </label>
            {/* <textarea
              id="editProfileDescription"
              className='editProfileDescription'
              value={editProfileDescription}
              onChange={e => setEditProfileDescription(e.target.value)}
              rows={5}
            /> */}
            <Textarea
              receivedName='NewPostTextArea'
              receivedPlaceholder={"Type a short intro..."}
              receivedRows={5}
              receivedValue={editProfileDescription}
              handleOnChange={e => setEditProfileDescription(e.target.value)}
            />
          </>
        }
        <div className="editProfileNavigation">
          {editProfileCurrentPage !== 0 &&
            <div
              className="modalTopBtn navigateEditProfile"
              onClick={() => setEditProfileCurrentPage(editProfileCurrentPage - 1)}
            >
              Back
            </div>
          }
          {editProfileCurrentPage !== 2 &&
            <div
              className="modalTopBtn navigateEditProfile"
              onClick={() => setEditProfileCurrentPage(editProfileCurrentPage + 1)}
            >
              Next
            </div>
          }
        </div>
      </form>
    </ModalSkeleton >
  )
}

export default EditProfileModal
