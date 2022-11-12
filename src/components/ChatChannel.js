import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ChatInterface from './ChatInterface';

function ChatChannel(props) {
	const userData = useRef(props.location.state.user);
	const linkParams = useParams();
	const [channelId, setChannelId] = useState(null);

	if (Object.keys(linkParams).length === 0 && !channelId)
		return <div>
			<h1 className="mt-3">rtChat</h1>
			<p>Hey, {userData.current.email}</p>
			<p>You can easily plan your upcoming trips with people you know today by starting a channel.</p>

			<Button variant="success" type="button" onClick={() => setChannelId(4)}>
	        	Start a channel
	      	</Button>
		</div>

	return (
		<>
		<div className="mt-3">
			<h2>rtChat Channel ID: {channelId}</h2>

			<p>{userData.current.email}</p>
			
			<ChatInterface />

		</div>
		</>
	)
}

export default ChatChannel;