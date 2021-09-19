import React, { useState } from "react";
import '../css/activity-log-box.css'
import ActivityLogForm from './ActivityLogForm'
import ActivityDetailCard from './ActivityDetailCard'
import { formatDate } from '../date.js'

function ActivityLogBox({ userData, updateActivityCallback }) {

    const [params, setParams] = useState({ editMode: false, displayDate: formatDate(new Date()) });

    const updateActivities = (updatedData, date) => {
        setParams({ ...params, editMode: false, displayDate: date })
        updateActivityCallback(updatedData)
    }

    const onAddActivity = () => {
        setParams({ ...params, editMode: true })
    }

    const cancelAction = () => {
        setParams({ ...params, editMode: false })
    }

    return (
        <div className="activity-log-box-div">
            {((userData.info.calorieIntake && !userData.info.activities) || params.editMode) && <ActivityLogForm userData={userData} updateCallback={updateActivities} cancelCallback={cancelAction} />}
            {userData.info.calorieIntake && userData.info.activities && !params.editMode && <
                ActivityDetailCard userData={userData} displayDate={params.displayDate} />}
            <div className="activity-log-box-btn-div">
                {userData.info.activities && userData.info.calorieIntake && !params.editMode && <button className="add-activity-btn" onClick={onAddActivity}> Add Meal Consumption </button>}
            </div>
        </div>
    )
}

export default ActivityLogBox;