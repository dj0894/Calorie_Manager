import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { endSession } from '../services.js';
import ActivityLogBox from "./ActivityLogBox.jsx";
import '../css/home.css'
import UserInfoBox from "./UserInfoBox.jsx";
import TipsCaraousel from './TipsCaraousel'


function Home({ userData, setUserData }) {

    const logout = () => {
        endSession()
            .then(response => {
                setUserData({ authenticated: false, username: "" })
            })
            .catch(err => {
                console.log(err);
            })
    };

    const updateUserData = (updatedData) => {
        setUserData({ ...userData, info: updatedData.info })
    }

    const updateActivityData = (updatedData) => {
        setUserData({ ...userData, info: updatedData })
    }

    return (
        <Router>
            <div>

                <div className="home-user-logout-div">
                    <div className="loggedin-user-div">
                        <h2>Welcome, {userData.username}!</h2>
                    </div>
                    <div className="website-title">Calorie Manager</div>
                    <div className="logout-btn-div">
                        <button className="logout-btn" onClick={logout}> Logout</button>
                    </div>
                </div>
                <div className="tip-carousel-header">
                    <h2>Tip Of The Day</h2>
                </div>
                <TipsCaraousel />

                <UserInfoBox userData={userData} updateUserCallback={updateUserData} />

                <ActivityLogBox userData={userData} updateActivityCallback={updateActivityData} />


            </div>
        </Router >

    );
}

export default Home;