import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import SignUp from './components/SignUp';

const routes = (
  <App>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/signup' component={SignUp} />
      <Route path='/about' component={About} />
    </Switch>
  </App>
)

export { routes };