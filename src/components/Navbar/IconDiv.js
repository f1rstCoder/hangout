import React, { useEffect, useState } from 'react'
import '../../assets/styles/Navbar.css'
import { Mail, More, Home, Search, Trending, HangoutLogo } from '../../assets/icons/NavbarIcons'
import { Link } from 'react-router-dom'
import { getAxios } from '../../lib/DefineAxiosGet'
import { ProfilePhoto } from '../AuthorBar'

const IconDiv = ({ index, id = -1 }) => {
	const [profilePhotoURL, setProfilePicURL] = useState('')
	const [profileUsername, setProfileUsername] = useState('')

	useEffect(() => {
		if (id > -1) {
			getAxios(`http://localhost:3050/users/${id}`)
				.then(res => {
					setProfilePicURL(res.profile_photo)
					setProfileUsername(res.username)
				})
		}
	}, [])

	const route = [
		["/home", true, Home],
		["/trending", true, Trending],
		["/message", true, Mail],
		["/search", true, Search],
		["", false, More],
		[`/profile/${id}`, true, ''],
	]
	const titlesForNav = ["Home", "Trending", "Messages", "Search", "More", "Profile",]
	const ComponentName = route[index][2]

	return (
		<div className="navlinks">
			{route[index][1] &&
				<Link to={route[index][0]}>
					<div className="navlink-data">
						<div className="navIconComponent">
							{index == 5 ?
								<ProfilePhoto profilePhotoURL={profilePhotoURL} />
								:
								<ComponentName />
							}
						</div>
						<span className="titleOfNavDiv">{index === 5 ? profileUsername : titlesForNav[index]}</span>
					</div>
				</Link>
			}
			{index === 4 &&
				<div className="navlink-data">
					<div className="navIconComponent">
						<ComponentName />
					</div>
					<span className="titleOfNavDiv">{titlesForNav[index]}</span>
				</div>
			}
		</div>

	)
}

export default IconDiv
