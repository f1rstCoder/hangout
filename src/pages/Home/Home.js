import React, { useState, useEffect } from 'react'
import '../../assets/styles/Home.css'
import { useDispatch } from 'react-redux'
import { setPostCount } from '../../context/data/dataSlice'
import Feeds from '../Feeds/Feeds'
import { getAxios } from '../../lib/DefineAxiosGet'
// import Status from '../Statuses/Status'
import NewPostModal from '../../components/Modals/MultiPageModals/NewPostModal'

const Home = () => {
  const id = localStorage.getItem('id')
  const [posts, setPosts] = useState([])
  // const [status, setStatus] = useState([])
  const [showNewPostModal, setShowNewPostModal] = useState(false)

  const dispatch = useDispatch()
  const shuffleArray = array => array.sort(() => Math.random() - 0.5);
  const closeModalNewPost = () => setShowNewPostModal(false)

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
              // Axios call for statuses
              // getAxios(`http://localhost:3080/${res[0].id}`)
              //   .then(resp => {
              //     console.log("sTATUSES rESP: ", res[0].id, " = ", resp)
              //     resp.forEach(status => setStatus(oldStatusArray => [...oldStatusArray, status]))
              //   })
              //   .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
        })
        setPosts([...shuffleArray(posts)])
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className='home'>
      {/* {status && <Status statuses={status} />} */}
      {posts && <Feeds posts={posts} id={id} user={-1} />}
      {showNewPostModal && <NewPostModal closingFunction={closeModalNewPost} />}
    </div>
  )
}

export default Home
