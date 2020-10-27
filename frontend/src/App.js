import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from "jwt-decode";
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
import CreateRestProfile from './components/Dashboard/RestProfile';
import EditRestProfile from './components/Dashboard/EditRestProfile';
import ViewMenuItems from './components/MenuItems/ViewMenuItems';

import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

//Redux Setup
import { Provider } from 'react-redux';
import store from './store';


import './App.css';

if (localStorage.token) {
  console.log("SetAuthToken",localStorage.token)
  setAuthToken(localStorage.token);
  var decoded = jwt_decode(localStorage.token);
  console.log("decoded",decoded.restuser);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token){
      if(decoded.restuser){
        store.dispatch(restLoadUser());
      }
      if(decoded.user){
        store.dispatch(loadUser());
      }
    }
   
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
              <PrivateRoute exact path='/createprofile' component={CreateRestProfile}/>
              <PrivateRoute exact path='/updateprofile' component ={EditRestProfile}/>
              <PrivateRoute exact path='/viewmenu' component={ViewMenuItems}/>
            </switch>
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>

  )
}


export default App;
