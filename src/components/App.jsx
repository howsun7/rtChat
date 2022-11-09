import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { routes } from '../routes';
import Login from './Login';
import SignUp from './SignUp';


const storageKey = 'token';

// function removeToken(tokenResetCallback) {
//   localStorage.removeItem(storageKey);
//   tokenResetCallback(null);

// }

function App() {

  // const params = useParams()
  // const token = getToken();

  const [token, setToken] = React.useState(getToken());
  const [isNewUser, setIsNewUser] = React.useState(false);
  let authLinks;

  function getToken() {
    const tokenStored = localStorage.getItem(storageKey);
    return JSON.parse(tokenStored);
  }

  function saveToken(token) {
    localStorage.setItem(storageKey, JSON.stringify(token));
    setToken(token);
  }

  function removeToken() {
    localStorage.removeItem(storageKey);
    setToken(null);
  }

  if (!token) {
    authLinks = <Nav.Link to='/login' as={NavLink}>Login</Nav.Link>; 

    return (
      <Container>
        { isNewUser 
          ? 
          <div>
            <SignUp saveToken={saveToken} />
            <a className="mt-2" onClick={() => setIsNewUser(false)} style={{cursor: 'pointer', display: 'block'}}>Have an account? Log in here=)</a>
          </div>
          :                    
          <div>
            <Login saveToken={saveToken} />

            <a className="mt-2" onClick={() => setIsNewUser(true)} style={{cursor: 'pointer', display: 'block'}}>New user? Sign up here:)</a>
          </div>
        }
      </Container>
    )
  } else {    
    authLinks = <Nav.Link onClick={() => removeToken(setToken) }>Logout</Nav.Link>; 
  }

  return (
      <div className='app-container'>
        
        <Navbar bg="warning" variant="light">
        <Container>
          <Navbar.Brand to='/' as={NavLink}>TravelChat</Navbar.Brand>          
          <Nav className="me-auto">                        
            <Nav.Link to='/chat' as={NavLink}>rtChat</Nav.Link>
            <Nav.Link to='/signup' as={NavLink}>Sign up</Nav.Link>

            { authLinks }
            <Nav.Link to='/about' as={NavLink}>About</Nav.Link>  
            <Nav.Link to='/about/subroute' as={NavLink}>sdfs</Nav.Link>  
          </Nav>
      </Container>  
      </Navbar>

      <Container>
        { routes }
      </Container>

      </div>

    )
}
export default App;

