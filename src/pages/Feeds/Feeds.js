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
              <Post post={newPost} id={props.id} user={props.user} />
            )
          })
      }
      {props.posts.map(post => {
        return (
          <Post post={post} id={props.id} user={props.user} />
        )
      })}
    </div>
  )
}

export default Feeds
