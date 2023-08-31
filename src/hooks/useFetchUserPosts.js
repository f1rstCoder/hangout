import { useState, useEffect } from 'react'
import { getAxios } from '../lib/DefineAxiosGet'
import { useDispatch } from 'react-redux'
import { setPostCount } from '../context/data/dataSlice'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const useFetchUserPosts = id => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (!id)
      return console.error("Returning from useFetchUserPosts");

    getAxios(`http://localhost:3040/${id}`)
      .then(res => {
        if (res.length === 0)
          return
        setPosts(res)
        dispatch(setPostCount(res.length))
      })
      .catch(err => console.error(err))
  }, [id])

  return { posts }
}

export default useFetchUserPosts
