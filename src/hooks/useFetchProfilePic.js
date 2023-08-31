import { useState, useEffect } from 'react'
import { getAxios } from '../lib/DefineAxiosGet';

const useFetchProfilePic = id => {
	const [followerProfilePics, setFollowerProfilePics] = useState([])
	const [isFetchingProfilePic, setIsFetchingProfilePic] = useState(false);
	const [errorInPpFetching, setErrorInPpFetching] = useState('');

	const fetchPic = eachId => {
		getAxios('http://localhost:3050/users', { username: eachId })
			.then(res => setFollowerProfilePics(oldVal => [...oldVal, res[0]?.profile_photo]))
			.catch(err => setErrorInPpFetching(err))
			.finally(() => setIsFetchingProfilePic(false));
	}

	useEffect(() => {
		if (Array.isArray(id)) {
			if (!id.length === 0)
				return;

			id.forEach(oneId => {
				setIsFetchingProfilePic(true)
				fetchPic(oneId)
			})
		} else {
			fetchPic(id)
		}
	}, [id])

	return {
		followerProfilePics, isFetchingProfilePic, errorInPpFetching
	}
}

export default useFetchProfilePic
