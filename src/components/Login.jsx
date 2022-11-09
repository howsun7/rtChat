import { useHistory } from "react-router-dom";
import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';

function Login(props) {
	const [inputs, setInputs] = React.useState({});
	const history = useHistory();

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
			
		setInputs(prevInputs => ({...prevInputs, [name]: value}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = 'http://localhost:7082/api/user/login';

		axios.post(url, inputs).then((res) => {
			const data = res.data;
			props.saveToken(data.token);
			history.push('/');
		}).catch((error) => {
			if (error.response) {
				console.log(error.response);
			}
		})

	}
	return (
		<>
		<h2 className="display-5 text-center mt-3 mb-3">Login</h2>
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
	      {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">
	        <Form.Check type="checkbox" label="Check me out" />
	      </Form.Group>*/}
	      <Button variant="warning" type="submit">
	        Login
	      </Button>
	    </Form>
		</>
	)
}

export default Login;