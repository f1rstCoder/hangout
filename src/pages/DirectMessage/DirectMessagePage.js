import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../../assets/styles/DirectMessagePage.css'
import TimeAgo from '../../components/TimeAgo'
import SubmitButton from '../../components/ui/Buttons/SubmitButton';
import Textarea from '../../components/form/Textarea';
import { ChevronRight } from '../../assets/icons/PostsIcons';
import { getAxios } from '../../lib/DefineAxiosGet';
import { Navigate } from 'react-router-dom';
import { AuthorBar } from '../../components/AuthorBar';
import { handleFindAccount } from '../../utils/Functions';

const DirectMessagePage = () => {
	const my_id = localStorage.getItem('id')
	const receivedUsername = useParams();
	const [profilePicUrl, setProfilePicUrl] = useState('')
	const [messages, setMessages] = useState([])

	useEffect(() => {
		getAxios(`http://localhost:3050/users?username=${receivedUsername.username}`)
			.then(res => {
				setProfilePicUrl(res.length === 0 ? 'Invalid' : res[0].profile_photo)
				getAxios(`http://localhost:3071/users/${my_id}`)
					.then(res => {
						if (res.direct_messages.length > 0) {
							const thisIsChatHistoryWithThisUser = res.direct_messages.filter(eachMessage => eachMessage.chat_user === receivedUsername.username)
							if (thisIsChatHistoryWithThisUser.length)
								setMessages([...thisIsChatHistoryWithThisUser[0].chats])
						}
					})
					.catch(err => console.error(err))
			})
			.catch(err => console.error("Error is: ", err))
	}, [])


	const [chatContent, setChatContent] = useState('')
	const [chatDetails, setChatDetails] = useState([])

	const handleChatSubmit = e => {
		e.preventDefault();
		const newChat = {
			chat_content: chatContent,
			from: "host",
			to: receivedUsername.username,
			chat_date: new Date()
		};
		setChatDetails(oldArray => [...oldArray, newChat]);
		setChatContent("");
	}

	if (profilePicUrl === 'Invalid')
		return <Navigate to={'no_such_path'} replace />
	return (
		<div className='chatsSection'>
			<div className="chatUser">
				<AuthorBar
					profilePhotoURL={profilePicUrl}
					authorName={receivedUsername.username}
					byLineContent={'Last active 10m ago'}
					onClickAuthor={() => handleFindAccount(receivedUsername.username)}
				/>
			</div>
			<div className="chatsContent">
				{/* <div className="chatsUI"> */}
				<div className="cell">
					{messages.length > 0 &&
						messages.map(chat => {
							return (
								<div className="messageContainer">
									<div className={`individualMessage ${chat.from === "host" ? "right" : "left"}`}>
										<div className="messageContent">
											<div className={`messageTime ${chat.from === "host" ? "right" : "left"}`}>
												<TimeAgo timestamp={chat.chat_date} />
											</div>
											{chat.chat_content}
										</div>
									</div>
								</div>
							)
						})
					}
					{chatDetails.length > 0 &&
						chatDetails.map(chat => {
							return (
								<div className="messageContainer">
									<div className={`individualMessage ${chat.from === "host" ? "right" : "left"}`}>
										<div className="messageContent">
											<div className={`messageTime ${chat.from === "host" ? "right" : "left"}`}>
												<TimeAgo timestamp={chat.chat_date} />
											</div>
											{chat.chat_content}
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
				{/* </div> */}
			</div>
			<div className="addChat">
				<form className="chatsForm" onSubmit={handleChatSubmit}>
					<div className="textAreaDiv">
						<Textarea
							receivedName='ChatTextArea'
							receivedPlaceholder={"Chat with your buddy..."}
							receivedRows={5}
							receivedValue={chatContent}
							handleOnChange={e => setChatContent(e.target.value)}
						/>
					</div>
					<div className="submitChat">
						<SubmitButton
							submitButtonText={<ChevronRight />}
							disablingCondition={!chatContent.split(" ").join("")}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DirectMessagePage
