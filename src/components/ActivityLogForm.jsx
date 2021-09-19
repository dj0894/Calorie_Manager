import React, { useState } from "react";
import '../css/activity-log-form.css'
import { formatDate } from '../date.js'
import { createActivity } from '../services.js'


function ActivityLogForm({ userData, updateCallback, cancelCallback }) {

    const [activityInput, setActivityInput] = useState({ food: "", calorie: "", date: formatDate(new Date()) })
    const [activityError, setActivityError] = useState({ food: "error", calorie: "error", submit: "error" });

    const onFoodChange = (e) => {
        const food = e.target.value;
        setActivityInput({ ...activityInput, food: food })
        if (food == "" || food == undefined) {
            setActivityError({ ...activityError, food: "required", submit: "error" })
        } else {
            let submit = "error"
            if (activityError.calorie == "")
                submit = ""
            setActivityError({ ...activityError, food: "", submit: submit })
        }
    }


    const onCalorieChange = (e) => {
        const calorie = e.target.value;
        setActivityInput({ ...activityInput, calorie: calorie })
        if (calorie == "" || calorie == undefined) {
            setActivityError({ ...activityError, calorie: "required", submit: "error" })
        } else if (isNaN(calorie)) {
            console.log("helo eror")
            setActivityError({ ...activityError, calorie: "invalidCalorie", submit: "error" })
        } else {
            let submit = "error"
            if (activityError.food == "")
                submit = ""
            setActivityError({ ...activityError, calorie: "", submit: submit })
        }
    }

    const onDateChange = (e) => {
        console.log(activityInput.date)
        setActivityInput({ ...activityInput, date: e.target.value })
    }


    const addActivity = () => {
        if (activityError.food == "" && activityError.calorie == "") {
            createActivity(userData.username, activityInput.food, activityInput.calorie, activityInput.date).then(
                updatedData => updateCallback(updatedData, activityInput.date)
            )
        } else {
            console.log("Errors in Input")
        }
    }

    return (
        <div className="add-activity-div">
            <h2>Add Meal To Calculate Calorie Consumption</h2>
            <form className="add-meal-form" onSubmit={e => e.preventDefault()}>
                <table>
                    <tbody>
                        <tr>
                            <td className="add-meal-form-coloumn"><label>Item Consumed</label></td>
                            <td className="add-meal-form-coloumn"><input type="text" name="food" value={activityInput.food} onChange={onFoodChange} placeholder="ex: apple"></input></td>
                            <td className="add-meal-form-coloumn">
                                {activityError.food === "required" && (<span role="error"> Food intake is required</span>)}
                                {activityError.food === "invalidFood" && (<span role="error"> Food intake should be of atleast 2 letters and contain character A-Z,a-z</span>)}
                            </td>
                        </tr>
                        <tr>
                            <td className="add-meal-form-coloumn"><label>Calorie</label></td>
                            <td className="add-meal-form-coloumn"><input type="text" name="calorie" value={activityInput.calorie} onChange={onCalorieChange} placeholder="calorie-intake"></input></td>
                            <td className="add-meal-form-coloumn">
                                {activityError.calorie === "required" && (<span role="error"> Calorie is required</span>)}
                                {activityError.calorie === "invalidCalorie" && (<span role="error"> Calorie should be a numeric value 0-9</span>)}
                            </td>
                        </tr>
                        <tr>
                            <td className="add-meal-form-coloumn"><label>Date</label></td>
                            <td className="add-meal-form-coloumn"><input type="date" name="date" value={activityInput.date} value={activityInput.date} onChange={onDateChange} /></td>
                        </tr>
                        <tr>
                            <td className="add-meal-form-coloumn"><button className={activityError.submit == "" ? "add-meal-btn" : "disable-meal-btn"} disabled={activityError.submit == "" ? "" : "disabled"} onClick={addActivity}>Submit</button></td>
                            <td className="add-meal-form-coloumn"><button className="cancel-meal-btn" onClick={cancelCallback}>Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >
    )
}

export default ActivityLogForm