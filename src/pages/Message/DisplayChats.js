import React, { useEffect, useState } from 'react'
import { getAxios } from '../../lib/DefineAxiosGet'
import '../../assets/styles/DisplayChats.css'
import useFetchProfilePic from '../../hooks/useFetchProfilePic'
import { Link } from 'react-router-dom'
import { AuthorBar } from '../../components/AuthorBar'
import TimeAgo from '../../components/TimeAgo'

const Message = () => {
	const id = localStorage.getItem('id')
	const [messages, setMessages] = useState([])
	const [listOfDMUsers, setListOfDMUsers] = useState([])
	const { followerProfilePics } = useFetchProfilePic(listOfDMUsers);
	const [unreadChatsCount, setUnreadChatsCount] = useState(0)

	useEffect(() => {
		messages.forEach(message => {
			setListOfDMUsers(oldArray => [...oldArray, message.chat_user])
			if (message.unreadMsgs > 0)
				setUnreadChatsCount(unreadChatsCount + 1)
		})
		console.log(messages)
	}, [messages])

	useEffect(() => {
		getAxios(`http://localhost:3071/users/${id}`)
			.then(res => setMessages([...res.direct_messages]))
			.catch(err => console.error(err))
	}, [])

	return (
		<div className='displayChats'>
			<div className="displayHeading">
				<h2>Messages</h2>
			</div>
			<div className="chatsDiv">
				<div className="displayChats">
					{messages.map((message, index) => {
						return (
							<Link to={`/dm/${message.chat_user}`}>
								<div className="chat">
									<div className="authorBarInMessagesPage">
										<AuthorBar
											profilePhotoURL={followerProfilePics[index]}
											authorName={message.chat_user}
											byLineContent={message.chats.slice(-1)[0].chat_content.slice(0, 100) || ''}
										/>
									</div>
									<div className="dateAndUnreadDiv">
										<div className="lastChatDate">
											<TimeAgo timestamp={message.chats.slice(-1)[0].chat_date} />
										</div>
										<div className="unreadMsgsDiv">
											{message.chats.filter(chat => chat.seen === false).length > 0 ?
												<div className="unreadMsgsCounter">
													{message.chats.filter(chat => chat.seen === false).length}
												</div>
												:
												''
											}
										</div>
									</div>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Message
