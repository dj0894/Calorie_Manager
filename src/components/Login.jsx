import { useState, useEffect } from 'react';
import { createSession, checkSession } from '../services.js';
import { BrowserRouter as Router, Link, Route, Redirect } from "react-router-dom";
import '../css/login.css';



function Login({ userData, loginCallBack }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        checkSession().then((userInfo) => {
            console.log(userInfo)
            if (!userData.authenticated) {
                loginCallBack({ authenticated: true, username: userInfo.username, info: userInfo.info })
            }
        })
            .catch(error => {
                console.log(error)
            });
    }, [userData]);

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const onPasswordChange = (e) => {
        console.log(e.target.value);
        setPassword(e.target.value);

    }

    const login = () => {
        createSession({ username, password })
            .then(userinfo => {
                loginCallBack({ authenticated: true, username: username, info: userinfo.info })
            })
            .catch(err => {
                setLoginError(err);
                console.log(err)
            });
    };

    if (userData.authenticated) {
        return <Redirect to="/" />;
    }

    return (

        <div className="login-main-div">
            <div className="login-image-div">
            </div>
            <h1>Calorie Manager</h1>
            <div className="login-form-div">
                <form onSubmit={e => e.preventDefault()}>
                    <h2>Login</h2>
                    <label><b>Username</b></label>
                    <input type="text" onChange={onUsernameChange} placeholder="Enter Username" name="username"></input><br />
                    <label><b>Password</b></label>
                    <input type="password" onChange={onPasswordChange} placeholder="Enter Password" name="password"></input><br />
                    <button className="login-btn" onClick={login} disabled={isDisabled} > Login </button>
                    <div className="login-status-div">{loginError}
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login;
