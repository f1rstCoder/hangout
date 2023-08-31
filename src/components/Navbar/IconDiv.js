import React, { useEffect, useState } from 'react'
import '../../assets/styles/Navbar.css'
import { Mail, More, Home, Search, Trending, HangoutLogo } from '../../assets/icons/NavbarIcons'
import { Link } from 'react-router-dom'
import { getAxios } from '../../lib/DefineAxiosGet'
import { ProfilePhoto } from '../AuthorBar'

const IconDiv = ({ index }) => {
	const id = localStorage.getItem('id')
	const [profilePicURL, setProfilePicURL] = useState('')

	useEffect(() => {
		getAxios(`http://localhost:3050/users`, {
			id: id
		})
			.then(res => setProfilePicURL(res[0]?.profile_photo))
			.catch(err => console.error(err))
	}, [])

	const route = [
		["/home", true, Home],
		["/trending", true, Trending],
		["/message", true, Mail],
		["/search", true, Search],
		["", false, More],
		[`/profile/${id}`, true, HangoutLogo],
	]
	const titlesForNav = ["Home", "Trending", "Messages", "Search", "More", "Profile",]
	const ComponentName = route[index][2]

	return (
		<>
			{
				route[index][1] ?
					<div className="navlinks">
						<Link to={route[index][0]}>
							<div className="navlink-data">
								<ComponentName />
								<span className="titleOfNavDiv">{titlesForNav[index]}</span>
							</div>
						</Link>
					</div>
					:
					<div className="navlink">
						<div className="navlink-data">
							<ComponentName />
							<span className="titleOfNavDiv">{titlesForNav[index]}</span>
						</div>
					</div>

			}
		</>
	)
}

export default IconDiv
