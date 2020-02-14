import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom';
import FoodList from '../components/FoodList'
import ExerciseList from '../components/ExerciseList'
import NoteList from '../components/NoteList'
import Graphs from '../components/Graphs'

export class DayPage extends Component {
    constructor(){
        super()
        this.state = {
            todayExercises: null,
            breakfastFoods: null,
            lunchFoods: null,
            dinnerFoods: null,
            todayNotes: null,
            foodData: null,
        }
    }

    componentDidMount(){
        console.log(this.props)
        let today = new Date()
        let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        console.log(currentDate)
        const token = localStorage.getItem('token');
            if (token) {
                api.getCurrentUser().then(json => {
                let user = json.user.data.attributes;
                    console.log('calendar')
                    api.getUserFoods(user.id, currentDate)
                    .then(json => {
                        let breakfastFoods = json.data.filter(food => food.attributes.meal === 'breakfast')
                        let lunchFoods = json.data.filter(food => food.attributes.meal === 'lunch')
                        let dinnerFoods = json.data.filter(food => food.attributes.meal === 'dinner')
                        let foodData = {
                            fat: json.data.map((food)=>{
                                let fatHash = {}
                                fatHash['data'] = food.attributes.fat
                                fatHash['time'] = food.attributes.time
                                return fatHash
                            }),
                            protein: json.data.map((food)=>{
                                let proteinHash = {}
                                proteinHash['data'] = food.attributes.protein
                                proteinHash['time'] = food.attributes.time
                                return proteinHash
                            }),
                            carbs: json.data.map((food)=>{
                                let carbHash = {}
                                carbHash['data'] = food.attributes.carbs
                                carbHash['time'] = food.attributes.time
                                return carbHash
                            }),
                            calories: json.data.map((food)=>{
                                let caloriesHash = {}
                                caloriesHash['data'] = food.attributes.calories
                                caloriesHash['time'] = food.attributes.time
                                return caloriesHash
                            }),
                            potassium: json.data.map((food)=>{
                                let potassiumHash = {}
                                potassiumHash['data'] = food.attributes.potassium
                                return potassiumHash
                            }),
                            sugar: json.data.map((food)=>{
                                let sugarHash = {}
                                sugarHash['data'] = food.attributes.sugar
                                return sugarHash
                            }),
                            sodium: json.data.map((food)=>{
                                let sodiumHash = {}
                                sodiumHash['data'] = food.attributes.sodium
                                return sodiumHash
                            }),
                            saturated_fat: json.data.map((food)=>{
                                let saturated_fatHash = {}
                                saturated_fatHash['data'] = food.attributes.saturated_fat
                                return saturated_fatHash
                            }),
                            dietary_fiber: json.data.map((food)=>{
                                let dietary_fiberHash = {}
                                dietary_fiberHash['data'] = food.attributes.dietary_fiber
                                return dietary_fiberHash
                            }),
                            cholesterol: json.data.map((food)=>{
                                let cholesterolHash = {}
                                cholesterolHash['data'] = food.attributes.cholesterol
                                return cholesterolHash
                            })
                        }
                        this.setState({
                            breakfastFoods: breakfastFoods,
                            lunchFoods: lunchFoods,
                            dinnerFoods: dinnerFoods,
                            foodData: foodData
                        })
                        console.log(foodData)
                    })

                    api.getUserExercises(user.id, currentDate)
                    .then(json => {
                        console.log(json.data)
                        let exerciseData = json.data.map(food => food.attributes.calories)
                        this.setState({
                            todayExercises: json.data,
                            exerciseData: exerciseData
                        })
                    })

                    api.getUserNotes(user.id, currentDate)
                    .then(json => {
                        console.log(json.data)
                        this.setState({
                            todayNotes: json.data
                        })
                    })
                })
            }
    }

    render() {
        let breakfastFoods
        let lunchFoods
        let dinnerFoods
        let todayExercises
        let todayNotes
        let foodgraphs
        let caloriesBurned
       
            if (!!this.state.todayExercises && !this.state.todayExercises[0]){
                todayExercises = "No Exercises Posted"
            } else if(!!this.state.todayExercises){
                todayExercises = <ExerciseList props = {this.props} exercises = {this.state.todayExercises}/>
            } 

            if (!!this.state.breakfastFoods && !this.state.breakfastFoods[0]){
                breakfastFoods = "No Breakfast Items Posted"
            } else if(!!this.state.breakfastFoods && !!this.state.breakfastFoods[0]){
                console.log(this.state.breakfastFoods)
                breakfastFoods = <FoodList props = {this.props} foods ={this.state.breakfastFoods}/>
            } 
            
            if (!!this.state.lunchFoods && !this.state.lunchFoods[0]){
                lunchFoods = "No Lunch Items Posted"
            } else if(!!this.state.lunchFoods && !!this.state.lunchFoods[0]){
                console.log(this.state.lunchFoods)
                lunchFoods = <FoodList props = {this.props} foods ={this.state.lunchFoods}/>
            } 

            if (!!this.state.dinnerFoods && !this.state.dinnerFoods[0]){
                dinnerFoods = "No Dinner Items Posted"
            } else if(!!this.state.dinnerFoods && !!this.state.dinnerFoods[0]){
                console.log(this.state.dinnerFoods)
                dinnerFoods = <FoodList props = {this.props} foods ={this.state.dinnerFoods}/>
            } 

            if (!!this.state.todayNotes && !this.state.todayNotes[0]){
                todayNotes = "No Notes Posted"
            } else if(!!this.state.todayNotes && !!this.state.todayNotes[0]){
                todayNotes = <NoteList props = {this.props} notes = {this.state.todayNotes}/>
            } 

            if(!this.state.foodData){
                foodgraphs = "Loading"
            } else if (!!this.state.foodData && !this.state.foodData.calories[0]){
                foodgraphs = <h3>No Foods Posted</h3>
            } else {
                foodgraphs = <Graphs exerciseData = {this.state.exerciseData} foodData = {this.state.foodData}/>
            }

            if(!this.state.exerciseData){
                caloriesBurned = "Loading"
            } else if (!!this.state.exerciseData && !this.state.exerciseData[0]){
                caloriesBurned = "No Exercises Posted"
            } else {
                let sum = this.state.exerciseData.reduce((total, sum) => total + sum)
                caloriesBurned = `${sum} calories`
            }

            var today = new Date()
            var currentDate = {
                date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
            }
            console.log(currentDate)
        return (
            
        <div>
        <h1>{currentDate.date}</h1>  
        <div className="top-section">
            <div className ="graph-section">
                <h2>Graphs</h2>
                {foodgraphs}
                <div>
              <div className ="exercise-data-div">
                <h1>Calories Burned Today:</h1>
                <h3>{caloriesBurned}</h3>
              </div>
            </div>
            </div>
        </div>

        <div className = "track-container-meal">
            <div className = "track-box">
                <div className="food-header">
                    <h3>Breakfast</h3>
                    <div className="food-add">
                        <Link className="primary-bttn" to={{pathname: '/postFood',
                            state: {
                                date: currentDate,
                                meal: 'breakfast'
                            }
                        }}>+</Link> 
                    </div>
                </div>
                <div className="displayFood">
                    {breakfastFoods}
                </div> 
            </div>
    
            <div className="track-box">
                <div className= "food-header">
                    <h3>Lunch</h3>
                    <div className="food-add">
                        <Link className ="primary-bttn" to={{pathname: '/postFood',
                            state: {
                                date: currentDate,
                                meal: 'lunch'
                            }
                        }}>+</Link>
                    </div>
                </div>
                <div className="displayFood">
                    {lunchFoods}
                </div>
            </div>

            <div className="track-box">
                <div className= "food-header">
                    <h3>Dinner</h3>
                    <div className="food-add">
                        <Link className = "primary-bttn" to={{pathname: '/postFood',
                            state: {
                                date: currentDate,
                                meal: 'dinner'
                            }
                        }}> + </Link>
                    </div>
                </div>
                <div className="displayFood">
                    {dinnerFoods}
                </div>
            </div>
        </div>

        <div className= "track-container-exercise">
                    <div className="track-box">
                        <h2>Exercise Entries</h2>
                        <div className="displayExercise">
                            {todayExercises}
                        </div>
                        <br></br>
                        <Link className="primary-bttn" to={{pathname: '/postExercise',
                            state: {
                                date: currentDate
                            }
                        }}>Post Exercise</Link>
                        
            </div>
        </div>

        <div className = "track-container">
            <div className="track-box">
                <h2>Notes</h2>
                <div className="displayNote">
                    {todayNotes}
                </div>
                <br></br>
                <Link className = "primary-bttn" to={{pathname: '/postNote',
                    state: {
                        date: currentDate
                    }
                }}>Post Note</Link>
                <br></br>
            </div>
            
        </div>
        <br></br><br></br>
    </div>
        )
    }
}

export default DayPage
