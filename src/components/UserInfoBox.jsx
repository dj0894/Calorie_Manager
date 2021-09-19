import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import CalculateCalorieForm from "./CalculateCalorieForm.jsx";
import { useState, useEffect } from 'react';
import UserDetailCard from "./UserDetailCard.jsx";
import '../css/user-info-box.css'


function UserInfoBox({ userData, updateUserCallback }) {

    const [params, setParams] = useState({ editMode: false, formValid: false })

    const updateUserData = (updatedData) => {
        setParams({ ...params, editMode: false })
        updateUserCallback(updatedData)
    }

    const onCalculate = () => {
        setParams({ ...params, editMode: true, formValid: false })
    }

    const editInfo = () => {
        setParams({ ...params, editMode: true, formValid: true })
    }

    const cancelAction = () => {
        setParams({ ...params, editMode: false })
    }

    return (
        <div className="user-info-main-div">

            {userData.info && !userData.info.calorieIntake && !params.editMode &&
                <div className="user-info-box-div">
                    <h2>
                        Click below button to know how many calories you should
                        eat per day to keep your body healthy.
                    </h2>
                    <button className="calculate-calorie-main-btn" onClick={onCalculate}>Calculate Calorie Intake</button>
                </div>
            }

            {params.editMode && <CalculateCalorieForm userData={userData} formCallBack={updateUserData} cancelCallback={cancelAction} params={params} />}

            {userData.info && userData.info.calorieIntake && !params.editMode && <UserDetailCard userInfo={userData.info} editCallback={editInfo} />}

        </div >

    )

}

export default UserInfoBox;