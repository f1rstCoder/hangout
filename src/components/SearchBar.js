import React, { useState } from 'react'
import '../assets/styles/SearchBar.css'
import { Search } from '../assets/icons/NavbarIcons'
import { getAxios } from '../lib/DefineAxiosGet'
import SubmitButton from './ui/Buttons/SubmitButton'
import Input from './form/Input'

const SearchBar = ({ parentCallback, setUseState }) => {
	const [inputVal, setInputVal] = useState('')

	const handleSearchCall = () => {
		setUseState()
		getAxios(`http://localhost:3050/users`, {
			username_like: inputVal
		})
			.then(res => parentCallback(res))
			.catch(err => console.error(err))
		setInputVal('')
	}

	return (
		<div className='searchBar'>
			<div className="inputDiv">
				<Input
					receivedValue={inputVal}
					receivedOnChange={e => setInputVal(e.target.value)}
					receivedPlaceholder='Search a profile here...'
				/>

				{/* <input
					type="text"
					value={inputVal}
					onChange={e => setInputVal(e.target.value)}
					autoComplete='off'
					className='searchBarInput'
					placeholder='Search a profile here...'
				/> */}
			</div>
			<div className="searchBtnDiv">
				<SubmitButton
					submitButtonText={<Search />}
					handleOnClickFunction={handleSearchCall}
					disablingCondition={!inputVal.split(" ").join("")}
				/>
			</div>
		</div>
	)
}

export default SearchBar
