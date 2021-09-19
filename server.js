const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;
app.use(cookieParser());
app.use(express.json());

app.use(express.static('./build'));
require('./session.js')(app);
let calorie = require('./calorie.js');
const { json } = require('express');

const calorieData = calorie.calorieData

app.get('/dashboard', (req, res) => {
    res.redirect('/');
})


app.post('/api/calories', (req, res) => {

    const gender = req.body.gender;
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const age = parseFloat(req.body.age);
    const username = req.body.username;

    let bmrValue = 0;
    if (gender === "MALE") {
        bmrValue = 66.5 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else if (gender === "FEMALE") {
        bmrValue = 665 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }
    let activities = undefined
    if (calorieData[username] && calorieData[username]["activities"]) {
        activities = calorieData[username]["activities"]
    }
    calorieData[username] = {
        calorieIntake: bmrValue.toFixed(2),
        gender: gender,
        weight: weight,
        height: height,
        age: age,
        activities: activities
    }
    console.log(calorieData)
    res.status(200).json(calorieData[username]);
})

app.post('/api/activity', (req, res) => {

    let username = req.body.username;
    let calorie = parseInt(req.body.calorie)
    if (!calorieData[username]["activities"]) {
        calorieData[username]["activities"] = []
    }
    calorieData[username]["activities"].push(
        {
            activityName: req.body.activityName,
            calorie: calorie,
            date: req.body.date
        }
    )
    res.status(200).json(calorieData[username]);
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});
