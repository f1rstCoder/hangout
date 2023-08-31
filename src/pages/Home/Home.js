import React, { useState, useEffect } from 'react'
import '../../assets/styles/Home.css'
import { useDispatch } from 'react-redux'
import { setPostCount } from '../../context/data/dataSlice'
import Feeds from '../Feeds/Feeds'
import { getAxios } from '../../lib/DefineAxiosGet'
const Home = () => {
  const id = localStorage.getItem('id')
  const [posts, setPosts] = useState([])
  const dispatch = useDispatch()

  const shuffleArray = array => {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    //Fetching Followers List
    getAxios(`http://localhost:3060/users/${id}`)
      .then(res => {
        res.followers.forEach(follower => {
          //Fetching ids for each follower based on username
          getAxios('http://localhost:3050/users', { username: follower })
            .then(res => {
              //fetching array of posts of each follower
              getAxios(`http://localhost:3040/${res[0].id}`, {
                page: 1,
                limit: 5,
              })
                .then(res => {
                  if (res.length === 0)
                    return
                  const length = res.length
                  res.forEach(dataItem => {
                    setPosts(oldPosts => [...oldPosts, dataItem])
                  })
                  dispatch(setPostCount(length))
                })
                .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        }
        )
        setPosts([...shuffleArray(posts)])
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='home'>
      {posts &&
        <Feeds
          posts={posts}
        />

      }
    </div>
  )
}

export default Home
