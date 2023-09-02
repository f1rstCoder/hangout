import React, { useState, useRef, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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
					.then(res => setMessages(oldArray => [...oldArray, res.direct_messages]))
					.catch(err => console.error(err))
			})
			.catch(err => console.error(err))
	}, [])

	// const location = useLocation();
	// const [propsData, setPropsData] = useState(location?.state ? location.state : null)
	const [chatContent, setChatContent] = useState('')
	const [chatDetails, setChatDetails] = useState([])
	console.log(messages[0].filter(message => message?.chat_user === receivedUsername.username)[0])

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
	const ref = useRef(null);

	useEffect(() => {
		if (chatDetails.length) {
			ref.current?.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [chatDetails.length]);


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
				<div className="chatsUI">
					<div className="cell">
						{/* {chatDetails?.map(chat => { */}
						{messages[0]
							.filter(message =>
								message?.chat_user === receivedUsername.username ?
									message?.chat_user === receivedUsername.username
									: []
							)[0]
							.chats
							.map(chat => {
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
							})}
					</div>
				</div>
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
