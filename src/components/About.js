import React, { Component } from 'react'
// import api from '../services/Api'

export class Home extends Component {

    render() {
        return (
            <div>
                <h1>About Us</h1>
                <div className = "exercise-plan-container">
                    <div className = "exercise-plan-display">
                    <h2 style = {{marginBottom: '4%'}}>Welcome to Nutrition Tracker 2.0</h2>
                    <p> 
                        Nutrition Tracker 2.0 is a nutrition tracking app, which specializes in displaying 
                        vital nutritional information. It's difficult to see the full picture when tracking 
                        nutrition info over time, but with Nutrition Tracker 2.0, you have all of your data organized by days,
                        weeks, and into graphs that include calorie intake, macronutrients, and everything that would
                        show up on a typical nutrition facts label. 

                    </p>
                    <p>
                        Nutrition Tracker 2.0 also utilizes the Nutritionix database, which has access
                        to nutrition information of almost a million different food items. It also
                        has access to a vast array of exercise information, so you can track how many
                        calories you burned on a job or a workout at the gym. Nutrition Tracker
                        makes use of natural language analysis, so you can type into the input box your exercises and
                        foods into plain English, and it will convert your input into relevant data. An example sentence 
                        would be something like: "I ate 2 bananas, and a chicken salad sandwich".
                    </p>
                    <p>
                        Studies show that there are benefits to keeping track of how many calories
                        you're consuming and what food you eat. With the help of the NutritionTracker app,
                        you can easily record and observe important info, to help you make accurate decisions.
                    </p>

                    </div>
                    
                </div>
                <br></br>
            </div>
        )
    }
}

export default Home
