import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function SignUp() {

	const [inputs, setInputs] = React.useState({});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
			
		setInputs(prevInputs => ({...prevInputs, [name]: value}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputs);
	}


	return (
		<>
		<h2 className="display-5 text-center mt-3 mb-3">Sign up</h2>
		<Form onSubmit={handleSubmit}>
	      <Form.Group className="mb-3" controlId="formBasicEmail">
	        <Form.Label>Email address</Form.Label>
	        <Form.Control type="email" placeholder="Enter email" name="email" value={inputs.email || ""} onChange={handleChange} />
	        <Form.Text className="text-muted">
	          We'll never share your email with anyone else.
	        </Form.Text>
	      </Form.Group>

	      <Form.Group className="mb-3" controlId="formBasicPassword">
	        <Form.Label>Password</Form.Label>
	        <Form.Control type="password" placeholder="Password" name="password" value={inputs.password || ""} onChange={handleChange} />
	      </Form.Group>
	      <Form.Group className="mb-3" controlId="formBasicCheckbox">
	        <Form.Check type="checkbox" label="Check me out" />
	      </Form.Group>
	      <Button variant="secondary" type="submit">
	        Sign up
	      </Button>
	    </Form>

		</>
	)
}

export default SignUp;