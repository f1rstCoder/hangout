import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFollowers } from '../context/data/dataSlice'
import { getAxios } from '../lib/DefineAxiosGet'

const useFetchFollowers = id => {
	const [followersList, setFollowersList] = useState([])
	const [followersCount, setFollowersCount] = useState(0)
	const [isFetchingFollowers, setIsFetchingFollowers] = useState(false);
	const [errorInFollowerFetching, setErrorInFollowerFetching] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		if (!id) return;

		setIsFetchingFollowers(true)

		getAxios(`http://localhost:3060/users/${id}`)
			.then(res => {
				setFollowersCount(res.followers.length)
				setFollowersList([...res.followers])
				dispatch(setFollowers(res.followers))
			})
			.catch(err => setErrorInFollowerFetching(err))
			.finally(() => setIsFetchingFollowers(false));
	}, [])



	return {
		followersList, followersCount, isFetchingFollowers, errorInFollowerFetching
	}
}

export default useFetchFollowers
