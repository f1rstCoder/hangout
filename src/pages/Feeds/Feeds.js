import React from 'react'
import Post from '../Post/Post'
import '../../assets/styles/Feeds.css'

const Feeds = (props) => {
  return (
    <div className='feeds'>
      {props.newPosts?.length > 0 &&
        props.newPosts
          .slice(0)
          .reverse()
          .map(newPost => {
            return (
              <Post post={newPost} />
            )
          })
      }
      {props.posts.map(post => {
        return (
          <Post post={post} />
        )
      })}
    </div>
  )
}

export default Feeds
