import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom';
import FoodList from '../components/FoodList'
import ExerciseList from '../components/ExerciseList'
import NoteList from '../components/NoteList'
import Graphs from '../components/Graphs'

export class DayPage extends Component {
    constructor(props){
        super()
        this.state = {
            dayExercises: null,
            breakfastFoods: null,
            lunchFoods: null,
            dinnerFoods: null,
            dayNotes: null,
            dateParams: props.match.params.date,
            foodData: null,
            currentUser: props.currentUser
            
        }
    }

    componentDidMount(){
        let currentUserId = localStorage.getItem('id')
        let dateParams = this.state.dateParams
            api.getUserFoods(currentUserId, dateParams)
            .then(json => {
                console.log(json.data)
                let breakfastFoods = json.data.filter(food => food.attributes.meal === 'breakfast')
                let lunchFoods = json.data.filter(food => food.attributes.meal === 'lunch')
                let dinnerFoods = json.data.filter(food => food.attributes.meal === 'dinner')
                let foodData = {
                    calories: json.data.map((food)=>{
                        let caloriesHash = {}
                        caloriesHash['data'] = food.attributes.calories
                        caloriesHash['time'] = food.attributes.time
                        return caloriesHash
                    }),
                    fat: json.data.map((food)=>{
                        let fatHash = {}
                        fatHash['data'] = food.attributes.fat
                        return fatHash
                    }),
                    protein: json.data.map((food)=>{
                        let proteinHash = {}
                        proteinHash['data'] = food.attributes.protein
                        return proteinHash
                    }),
                    carbs: json.data.map((food)=>{
                        let carbHash = {}
                        carbHash['data'] = food.attributes.carbs
                        
                        return carbHash
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
                foodData: foodData,
            })
            console.log(foodData)
        })

        api.getUserExercises(currentUserId, dateParams)
        .then(json => {
            console.log(json.data)
            let exerciseData = json.data.map(food => food.attributes.calories)
            this.setState({
                dayExercises: json.data,
                exerciseData: exerciseData,
            })
            
        })

        api.getUserNotes(currentUserId, dateParams)
        .then(json => {
            console.log(json.data)
            this.setState({
                dayNotes: json.data,
            })
        })            
    }

    render() {
        let breakfastFoods
        let lunchFoods
        let dinnerFoods
        let dayExercises
        let dayNotes
        let foodgraphs
        let caloriesBurned
        let date = this.props.match.params.date
        
            if (!!this.state.dayExercises && !this.state.dayExercises[0]){
                dayExercises = "No Exercises Posted"
            } else if(!!this.state.dayExercises && !!this.state.dayExercises[0]){
                dayExercises = <ExerciseList props = {this.props} exercises = {this.state.dayExercises}/>
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

            if (!!this.state.dayNotes && !this.state.dayNotes[0]){
                dayNotes = "No Notes Posted"
            } else if(!!this.state.dayNotes && !!this.state.dayNotes[0]){
                dayNotes = <NoteList props = {this.props} notes = {this.state.dayNotes}/>
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
            console.log(this.state.currentUser)
        return (
        <div>
            
            <div>
                <h1>{date}</h1>  
                <div className="top-section">
                    <div className ="graph-section">
                        <h2>Graphs</h2>
                        {foodgraphs}
                    </div>
                    <div className ="exercise-data-div">
                        <h1>Calories Burned Today:</h1>
                        <h3>{caloriesBurned}</h3>
                    </div>
                    
                </div>

                <div className = "track-container-meal">
                    <div className = "track-box">
                        <div className="food-header">
                            <h3>Breakfast</h3>
                            <div className="food-add">
                                <Link className="btn btn-light" to={{pathname: '/postfood',
                                    state: {
                                        date: this.props.match.params,
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
                                <Link className ="btn btn-light" to={{pathname: '/postfood',
                                    state: {
                                        date: this.props.match.params,
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
                                <Link className = "btn btn-light" to={{pathname: '/postfood',
                                    state: {
                                        date: this.props.match.params,
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
                                    {dayExercises}
                                </div>
                                <br></br>
                                <Link className="btn btn-light" to={{pathname: '/postexercise',
                                    state: {
                                        date: this.props.match.params
                                    }
                                }}>Post Exercise</Link>
                                
                    </div>
                </div>

                <div className = "track-container">
                    <div className="track-box">
                        <h2>Notes</h2>
                        <div className="displayNote">
                            {dayNotes}
                        </div>
                        <br></br>
                        <Link className = "btn btn-light" to={{pathname: '/postnote',
                            state: {
                                date: this.props.match.params
                            }
                        }}>Post Note</Link>
                        <br></br>
                    </div>
                    
                </div>
            </div>
            
            <br></br><br></br>
        </div>
        )
    }
}

export default DayPage
