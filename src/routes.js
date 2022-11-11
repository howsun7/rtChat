import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ChatChannel from './components/ChatChannel';


const routes = (

  <Switch>
     <Route exact path='/' component={Home} />
       <Route path='/signup' component={SignUp} />
       <Route path='/login' component={Login} />
       <Route path='/chat/:channelId' component={ChatChannel} />
       <Route path='/chat' component={ChatChannel} />
       <Route path='/about' component={About} />
    </Switch>
)
export { routes };