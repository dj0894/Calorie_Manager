
import './App.css';
import Home from "./components/Home";
import Login from './components/Login'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import {
  checkSession
} from './services.js';



function App() {

  const [userData, setUserData] = useState({ authenticated: false, username: '', info: {} })

  useEffect(() => {
    checkSession().then((userInfo) => {
      if (!userData.authenticated) {
        setUserData({ authenticated: true, username: userInfo.username, info: userInfo.info })
      }
    })
      .catch(error => {
        console.log(error)
      });
  }, [userData]);

  return (
    <div className="App">
      <Router>
        <Route exact path="/login" component={() => <Login userData={userData} loginCallBack={setUserData} />} />
        <PrivateRoute path="/dashboard" isAuthenticated={userData.authenticated}
          component={() => <Home userData={userData} setUserData={setUserData} />} />
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Router>
    </div>
  );
}

export default App;
