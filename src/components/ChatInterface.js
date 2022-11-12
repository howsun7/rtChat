import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function ChatInterface(props) {



	return (

		<div>

			<div className='messagesBox bg-light' style={{height: '200px', overflowY: 'scroll'}}>
			sdfs
			</div>
			<form>
				 <Stack direction="horizontal" gap={3}>
				      <Form.Control className="me-auto" placeholder="Write your message here..." />
				      <Button variant="secondary">Send</Button>
			    </Stack>
	      	</form>
			
		</div>
	)
}

export default ChatInterface;
