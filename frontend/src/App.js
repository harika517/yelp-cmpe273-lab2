import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CustLogin from './components/auth/Customer/Login';
import CustSignUp from './components/auth/Customer/Register';
//Redux Setup

import { Provider } from 'react-redux';
import store from './store';


import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment className="App">
        {/* <Navbar /> */}
        <Route exact path='/' component={Landing} />
        {/* <section className='container'> */}
        <Route exact path='/login' component={CustLogin} />
        <Route exact path='/register' component={CustSignUp} />
        {/* </section> */}
      </Fragment>
    </Router>
  </Provider>

)


export default App;