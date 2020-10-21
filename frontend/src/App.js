import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import CustLogin from './components/auth/Customer/Login';
import CustSignUp from './components/auth/Customer/Register';
import RestLogin from './components/auth/Restaurant/RestLogin';
import RestRegister from './components/auth/Restaurant/RestRegister';
import Alert from './components/layout/Alert';
import { loadUser, restLoadUser } from './actions/auth';
import RestDashboard from './components/Dashboard/RestDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux Setup
import { Provider } from 'react-redux';
import store from './store';


import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(restLoadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment className="App">
          {/* <Navbar /> */}
          <Route exact path='/' component={Landing} />
          <section>

            <switch>
              <Route exact path='/login' component={CustLogin} />
              <Route exact path='/register' component={CustSignUp} />
              <Route exact path='/restlogin' component={RestLogin} />
              <Route exact path='/restregister' component={RestRegister} />
              <PrivateRoute exact path='/restdashboard' component={RestDashboard} />
              <PrivateRoute exact path='/userdashboard' component={UserDashboard} />
            </switch>
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>

  )
}


export default App;
