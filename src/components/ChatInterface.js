import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function ChatInterface({ socket }) {

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const messageHandler = (event) => {
		event.preventDefault();

		if (!message)
			return;

		socket.emit('message', message);
		setMessage('');
	}

	if (socket) {
		socket.on('message', (data) => {
			setMessages([...messages, data.message])
		});
	}

	return (

		<div>

			<div className='messagesBox bg-light' style={{height: '200px', overflowY: 'scroll'}}>
			{	
				messages.map((message, idx) => {
					return <p key={idx}>{message}</p>
				})				
			}
			</div>
			<form onSubmit={messageHandler}>
				 <Stack direction="horizontal" gap={3}>
				      <Form.Control className="me-auto" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
				      <Button variant="secondary" type="submit">Send</Button>
			    </Stack>
	      	</form>
			
		</div>
	)
}

export default ChatInterface;
