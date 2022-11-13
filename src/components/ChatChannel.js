import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { io } from "socket.io-client";
import ChatInterface from './ChatInterface';

function ChatChannel(props) {
	const userData = useRef(props.location.state.user);
	const linkParams = useParams();
	const [channelId, setChannelId] = useState(null);
	const [socketInstance, setSocketInstance] = useState(null);
	const [isInChannel, setIsInChannel] = useState(false);

  const handleClick = () => {
    if (isInChannel === false) {
      setIsInChannel(true);
      setChannelId(4);
    } else {
      setIsInChannel(false);
    }
  };

	useEffect(() => {
		if (isInChannel === true) {
			const socket = io("http://localhost:7082", {
		        transports: ["websocket"],
		        cors: {
		          origin: "http://localhost:7081/",
		        },
		      });
			setSocketInstance(socket);

			console.log(socket);

			socket.on('connect', (res) => {
				console.log(res);
			});

			socket.on('disconnect', (res) => {
				console.log('disconnect')
			});

			return function cleanup() {
				socket.disconnect();
			}
		}
	}, [isInChannel])

	// if (Object.keys(linkParams).length === 0 && !channelId)
	// 	return <div>
	// 		<h1 className="mt-3">rtChat</h1>
	// 		<p>Hey, {userData.current.email}</p>
	// 		<p>You can easily plan your upcoming trips with people you know today by starting a channel.</p>

	// 		<Button variant="success" type="button" onClick={handleClick}>
	//         	Start a channel
	//       	</Button>
	// 	</div>
	

	return (
		<>
		{ isInChannel 
			?
<div className="mt-3">
			<h2>rtChat Channel ID: {channelId}</h2>
<Button variant="danger" type="button" onClick={handleClick}>
	        	Exit chat
	      	</Button>
			<p>{userData.current.email}</p>
			
			<ChatInterface />

		</div> 
			:
			<div>
			<h1 className="mt-3">rtChat</h1>
			<p>Hey, {userData.current.email}</p>
			<p>You can easily plan your upcoming trips with people you know today by starting a channel.</p>

			<Button variant="success" type="button" onClick={handleClick}>
	        	Start a channel
	      	</Button>
		</div>

		}
			
		</>
	)
}

export default ChatChannel;