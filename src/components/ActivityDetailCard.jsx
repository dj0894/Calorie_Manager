import { useState } from 'react';
import '../css/activity-detail-card.css'

function ActivityDetailCard({ userData, displayDate }) {

    const [activityDate, setActivityDate] = useState(displayDate);
    const [activities, setActivities] = useState(filterActivities(displayDate))
    const [calorieSum, setCalorieSum] = useState(calculateCalorieSum(displayDate))

    function filterActivities(filterDate) {
        return userData.info.activities.filter(activity => activity.date == filterDate)
    }

    function calculateCalorieSum(date) {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const filteredActivities = userData.info.activities.filter(activity => activity.date == date)
            .map(a => a.calorie)
        let sum = 0
        if (filteredActivities.length != 0) {
            sum = filteredActivities.reduce(reducer)
        }
        return sum;
    }


    const checkboxClick = (e) => {
        const allChecked = (e.target.checked)
        if (allChecked) {
            setActivities(userData.info.activities.sort((a, b) => {
                let fa = a.date, fb = b.date;
                if (fa < fb) {
                    return 1;
                }
                if (fa > fb) {
                    return -1;
                }
                return 0;
            }))
        } else {
            setActivities(filterActivities(displayDate))
        }
    }

    const onDateChange = (e) => {
        setActivityDate(e.target.value)
        setActivities(filterActivities(e.target.value))
        setCalorieSum(calculateCalorieSum(e.target.value))
    }

    return (
        <div className="activity-detail-main-div">
            <h2>Check Calorie Consumption For Selected Date</h2> <br />
            <label>Select Date</label>
            <input type="date" name="activity-date" value={activityDate} onChange={onDateChange} />
            <input type="checkbox" id="all" name="all" value="ALL" onChange={checkboxClick} />
            <label htmlFor="all">Show All</label><br></br>
            <div className="activity-table-div">
                <table className="activity-table">
                    <thead>
                        <tr >
                            <th className="activity-table-head">Meal</th>
                            <th className="activity-table-head">Calories</th>
                            <th className="activity-table-head">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(activities).map((activity, index) => (

                            <tr className="activity-table-row" key={index}>
                                <td className="activity-table-column">
                                    {activities[activity].activityName}
                                </td>
                                <td>
                                    {activities[activity].calorie}
                                </td>
                                <td>
                                    {activities[activity].date}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className="calorie-diff-div">
                <h2>Your Calorie difference (Ideal Calorie Intake for your body - Calorie Consumed) =
                    <span className={(userData.info.calorieIntake - calorieSum) >= 0 ? "calorie-diff-span-green" : "calorie-diff-span-red"}>
                        {userData.info.calorieIntake - calorieSum}</span> Calories</h2>
                <i> If the calorie difference is positive it means you have consumed less calories than your daily intake level  </i>
            </div>
        </div >
    )
}

export default ActivityDetailCard;