import React, { useState } from 'react'
import SearchBar from '../../components/SearchBar'
import '../../assets/styles/Search.css'
import { handleFindAccount } from '../../utils/Functions'

const Search = () => {
	const [searchOutput, setSearchOutput] = useState([])
	const [noResult, setNoResult] = useState(0)

	const handleCallback = childData => {
		if (childData.length === 0)
			setNoResult(1)
		else {
			setNoResult(-1)
			setSearchOutput(childData)
		}
	}

	return (
		<div className='search'>
			<div className="searchDiv">
				<SearchBar parentCallback={handleCallback} setUseState={() => setSearchOutput([])} />
			</div>
			<div className="resultsOfSearch">
				{searchOutput.length > 0 &&
					searchOutput.map((output, index) => {
						return (
							<div className='searchOutputDiv' onClick={() => handleFindAccount(output.username)} key={index}>
								<div className="outputProfilePhoto">
									<img src={output.profile_photo} alt="" className='profilePic' />
								</div>
								<div className="outputProfileName">
									{output.username}
								</div>
							</div>
						)
					})
				}
				{noResult === 1 &&
					<div div className='noOutputDiv'>
						No Results Found
					</div>
				}
			</div>
		</div >
	)
}

export default Search
