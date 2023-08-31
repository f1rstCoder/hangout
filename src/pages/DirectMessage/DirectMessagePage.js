import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../../assets/styles/DirectMessagePage.css'
import TimeAgo from '../../components/TimeAgo'
import SubmitButton from '../../components/ui/Buttons/SubmitButton';
import Textarea from '../../components/form/Textarea';

const DirectMessagePage = () => {
	const location = useLocation();
	const [propsData, setPropsData] = useState(location.state)
	const [chatContent, setChatContent] = useState('')
	const [chatDetails, setChatDetails] = useState(propsData.message ? propsData.message.chats : [])

	const handleChatSubmit = e => {
		e.preventDefault();
		const newChat = {
			chat_content: chatContent,
			from: "host",
			to: propsData.message ? propsData.message.chat_user : propsData.username,
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

	useEffect(() => {
		setPropsData(location.state)
	}, [location.state])

	return (
		<div className='chatsSection'>
			<div className="chatUser">
				<div className="chatProfile">
					<div className="profilePhoto">
						<img src={propsData.imgSrc} alt="" className='profilePic profilePicinDMPage' />
					</div>
					<div className="profileName">
						{propsData.message ? propsData.message.chat_user : propsData.username}
					</div>
				</div>
			</div>
			<div className="chatsContent">
				<div className="chatsUI">
					<div className="cell">
						{chatDetails?.map(chat => {
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
						<div ref={ref} id="scrollIntoView" />
					</div>
				</div>
			</div>
			<div className="addChat">
				<form className="chatsForm" onSubmit={handleChatSubmit}>
					<div className="textAreaDiv">
						{/* 
						<textarea
							name="ChatTextArea"
							placeholder="Chat with your buddy..."
							className="textArea chatTextArea"
							rows={5}
							value={chatContent}
							onChange={e => setChatContent(e.target.value)}
						></textarea> */}
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
							submitButtonText={"Send"}
							disablingCondition={!chatContent.split(" ").join("")}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DirectMessagePage
