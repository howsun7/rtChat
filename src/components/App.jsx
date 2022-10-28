import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Link to={'/'}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link to={'/about/subroute'}>Subcomponent</Link>
        {this.props.children}


        <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand to='/' as={NavLink}>TravelChat</Navbar.Brand>
          <Nav className="me-auto">
            
            
            <Nav.Link to='/chat' as={NavLink}>rtChat</Nav.Link>
            <Nav.Link to='/signup' as={NavLink}>Sign up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>



      </div>

    )
  }
}