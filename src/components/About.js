import React, { Component } from 'react'
// import api from '../services/Api'

export class Home extends Component {

    render() {
        return (
            <div>
                <h1>About Us</h1>
                <div className = "exercise-plan-container">
                    <div className = "exercise-plan-display">
                    <h3>Welcome to Nutrition Tracker 2.0</h3>
                    <p>Hello User!</p>
                    <p> 
                        With busy lives it's often difficult to keep track of some of
                        the more basic things in our lives like when a certain project is due.
                        Well, there are calendar apps for that. For anything related to tracking
                        nutrition, there's Nutrition Tracker.
                    </p>
                    <p>
                        Nutrition Tracker 2.0 utilizes the Nutritionix database, which has access
                        the nutrition information of almost a million different food items. It also
                        has access to vast array of exercise information, so you can track how many
                        calories you burned on a job or a workout at the gym. Nutrition Tracker
                        makes use of natural language analysis, so you can tell our application exactly
                        what you ate or what your exercise routine was, and it will understand what data 
                        needs to recorded. An example sentence would be something like: "I ate 2 bananas,
                        and a chicken salad sandwich". The Nutritionix API understands that you ate 2 
                        bananas and a chicken salad sandwich.
                    </p>
                    <p>
                        Studies show that there are benefits to keeping track of how many calories
                        you're consuming and what food you eat. Without the proper tool, though, it 
                        would not be worth the time to write everything down on a piece of paper. Don't 
                        worry, just tell the NutritionTracker app and you'll easily record all the info, with 
                        helpful graphs to visualize the data. 
                    </p>
                    <p>
                        Happy Tracking!
                    </p>
                    </div>
                    
                </div>
                <br></br>
            </div>
        )
    }
}

export default Home
