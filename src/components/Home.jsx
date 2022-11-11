import React from 'react';
import { useRef } from 'react';

function Home(props) {
  

  const userData = useRef(props.location.state.user);
  
  return (
    <div className='home'>
      jlkjklj
      <p>{userData.current.email}</p>
    </div>
  )
}

export default Home;