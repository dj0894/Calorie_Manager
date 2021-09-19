import "../css/calorie-calculator-form.css";
import { calculateCalories } from "../services";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function CalculateCalorieForm({ userData, formCallBack, cancelCallback, params }) {

    const [calorieFormInput, setCalorieFormInput] = useState({ age: "", gender: "MALE", weight: "", height: "" });
    const [calorieFormErrors, setCalorieFormErrors] = useState(getInitialErrorState);

    function getInitialErrorState() {
        if (!params.formValid) {
            return { age: "error", weight: "error", height: "error", submit: "error" }
        } else {
            return { age: "", weight: "", height: "", submit: "" }
        }
    }

    useEffect(() => {
        if (userData.info.calorieIntake) {
            setCalorieFormInput(
                {
                    age: userData.info.age,
                    gender: userData.info.gender,
                    weight: userData.info.weight,
                    height: userData.info.height
                }
            )
        }
    }, [userData])

    const onAgeChange = (e) => {
        const age = e.target.value;
        setCalorieFormInput({ ...calorieFormInput, age: age });
        if (age == "" || age == undefined) {
            setCalorieFormErrors({ ...calorieFormErrors, age: "required", submit: "error" });
        } else if (isNaN(age) || age < 10 || age > 200) {
            setCalorieFormErrors({ ...calorieFormErrors, age: "invalidAge", submit: "error" });
        } else {
            let submit = "error";
            if (calorieFormErrors.height == "" && calorieFormErrors.weight == "") {
                submit = ""
            }
            setCalorieFormErrors({ ...calorieFormErrors, age: "", submit: submit })
        }
    }

    const onGenderChange = (e) => {
        const gender = e.target.value;
        console.log(e.target.value)
        setCalorieFormInput({ ...calorieFormInput, gender: gender });
    }

    const onWeightChange = (e) => {

        const weight = e.target.value;
        setCalorieFormInput({ ...calorieFormInput, weight: weight });
        if (weight == "" || weight == undefined) {
            setCalorieFormErrors({ ...calorieFormErrors, weight: "required", submit: "error" });
        } else if (isNaN(weight) || parseInt(weight) < 1 || parseInt(weight) > 500) {
            console.log("over weight")
            setCalorieFormErrors({ ...calorieFormErrors, weight: "invalidWeight", submit: "error" });
        } else {
            console.log("no errors")
            let submit = "error";
            if (calorieFormErrors.height == "" && calorieFormErrors.age == "") {
                submit = ""
            }
            setCalorieFormErrors({ ...calorieFormErrors, weight: "", submit: submit })
        }
    }

    const onHeightChange = (e) => {
        const height = e.target.value;
        setCalorieFormInput({ ...calorieFormInput, height: height });
        if (height == "" || height == undefined) {
            setCalorieFormErrors({ ...calorieFormErrors, height: "required", submit: "error" });
        } else if (isNaN(height) || parseInt(height) < 10 || parseInt(height) > 300) {
            setCalorieFormErrors({ ...calorieFormErrors, height: "invalidHeight", submit: "error" })
        } else {
            let submit = "error";
            if (calorieFormErrors.weight == "" && calorieFormErrors.age == "") {
                submit = ""
            }
            setCalorieFormErrors({ ...calorieFormErrors, height: "", submit: submit })
        }
    }

    const onClickCalculateCalorie = () => {
        if (calorieFormErrors.age == "" && calorieFormErrors.weight == "" && calorieFormErrors.height == "") {
            calculateCalories(userData.username, calorieFormInput).then(calculatedCalorie => {
                formCallBack({ info: calculatedCalorie })
            })
        }
    }

    return (
        <div className="calculate-calorie-div">
            <h2>To know ideal calorie consumption for your body, enter below details and click "Submit" button.</h2>
            <form className="calculate-calorie-form" onSubmit={e => e.preventDefault()}>
                <table><tbody>
                    <tr>
                        <td><label>Age:</label></td>
                        <td><input type="text" name="age" onChange={onAgeChange} placeholder="age" value={calorieFormInput.age}></input><br /></td>
                        <td className="erros-calculate-calorie-form">{calorieFormErrors.age === "required" && (
                            <span role="error">Age is required</span>
                        )}
                            {calorieFormErrors.age === "invalidAge" && (
                                <span role="error">Age should be between 10 to 200</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td><label> Gender:</label></td>
                        <td><select onChange={onGenderChange}>
                            <option value="MALE" selected={calorieFormInput.gender == "MALE" ? "MALE" : false}>Male</option>
                            <option value="FEMALE" selected={calorieFormInput.gender == "FEMALE" ? "FEMALE" : false}>Female</option>
                        </select><br />
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><label>Current Weight:</label></td>
                        <td> <input type="text" name="weight" placeholder="in Kilogram" onChange={onWeightChange} value={calorieFormInput.weight}></input><br /></td>
                        <td className="erros-calculatse-calorie-form"> {calorieFormErrors.weight === "required" && (
                            <span role="a">Weight is required</span>
                        )}
                            {calorieFormErrors.weight === "invalidWeight" && (
                                <span role="error">Weight should be should be between 2 to 500</span>
                            )}</td>
                    </tr>
                    <tr>
                        <td><label>Height:</label></td>
                        <td><input type="text" name="height" placeholder="centimeters" onChange={onHeightChange} value={calorieFormInput.height}></input><br /></td>
                        <td className="erros-calculate-calorie-form">{calorieFormErrors.height === "required" && (
                            <span role="a">Height is required</span>
                        )}
                            {calorieFormErrors.height === "invalidHeight" && (
                                <span role="error">Height should be between 10 to 300</span>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td> <button className={calorieFormErrors.submit == "" ? "calculate-calorie-btn" : "disable-calorie-btn"} type="submit" value="submit" disabled={calorieFormErrors.submit == "" ? "" : "disabled"} onClick={onClickCalculateCalorie}>Submit</button></td>
                        <td ><button className="cancel-user-detail-btn" type="submit" onClick={cancelCallback}>Cancel</button></td>
                    </tr>
                </tbody>
                </table>
            </form>

        </div >
    )
}

export default CalculateCalorieForm;