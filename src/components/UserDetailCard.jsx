import '../css/user-detail-card.css'

function UserDetailCard({ userInfo, editCallback }) {

    return (
        <div className="user-detail-cards">
            <div className="user-detail-card">
                <h2>User Detail</h2>
                <table>

                    <tbody>

                        <tr className="user-detail-row">
                            <td className="user-detail-column">Age: </td><td className="user-detail-column" >{userInfo.age}</td>
                        </tr>
                        <tr className="user-detail-row">
                            <td className="user-detail-column">Height: </td><td className="user-detail-column" >{userInfo.height}</td>
                        </tr>
                        <tr className="user-detail-row">
                            <td className="user-detail-column">Weight: </td><td className="user-detail-column">{userInfo.weight}</td>
                        </tr>
                        <tr className="user-detail-row">
                            <td className="user-detail-column">Gender: </td><td className="user-detail-column">{userInfo.gender}</td>
                        </tr>
                        <tr className="user-detail-row">
                            <td className="user-detail-column">Calorie Intake: </td><td className="user-detail-column">{userInfo.calorieIntake}</td>
                        </tr>
                        <tr>
                            <td ><button className="edit-user-detail-btn" onClick={editCallback}>Edit</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="calorie-calculation-formula-card">
                <h2>Formula for calculating Basal Metabolic Rate(BMR)</h2>

                <br /><br />

                <code>MEN: BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age) </code> <br /> <br />

                <code>WOMEN:  BMR = 665 + (9.563 * weight) + (1.850 * height) - (4.676 * age) </code> <br />
                <br /><br />
                <i>** This formula does not account your activity level , Your activity level could change which could fluctuation in your daily calorie intake level</i>
            </div>
        </div >

    )

}

export default UserDetailCard;