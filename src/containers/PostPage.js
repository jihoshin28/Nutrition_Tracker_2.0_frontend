import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

var SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

export class PostPage extends Component {
    constructor() {
        super();
        this.state= {
            error: false,
            fields: null,
            date: null,
            meal: null,
            postState: false,
            menu: ''
        }
    }
    
    componentDidMount(){
        console.log(this.state)
    }

    talkToText(){

    }

    handleMenu = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
        console.log(this.state)
    }

    postNote = (event, subject, text, user, date) => {
        event.preventDefault()
        if(!date || !subject || !text){
            alert("Please Fill In Required Fields!")
        } else {
            let splitDate = date.split('-')
            api.postUserNote(subject, text, user, date)
            .then(json => {
                console.log(json)
                this.setState({
                    postState: true,
                    date: `${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`
                })
            })
        }
    }

    postFood = (event, query, user, date, meal) => {
        event.preventDefault()
        if(!date || !query || !meal || (!date && !query && !meal)){
           
            console.log(date, query, meal)
            alert("Please Fill In Required Fields!")
        } else {
            let splitDate = date.split('-')
            console.log(date, user, query, meal)
        api.nutritionixGetFood(query)
            .then(json => {
                json.foods.forEach(food => {
                    var today = new Date();
                    var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0':'') + today.getMinutes() + ":" + (today.getSeconds()< 10 ? '0':'') + today.getSeconds()
                    console.log(time)
                    api.postUserFood(food, user, meal, date, time)
                    .then(json => {
                        console.log(json)
                        this.setState({
                            postState: true,
                            date: `${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`
                        })
                    })
                })
                console.log(json)
            })
        } 
    }

    postExercise = (event, query, user, date) => {
        event.preventDefault()
        if(!query || !date){
            alert("Please Fill In Required Fields!")
        } else{ 
        api.nutritionixGetExercise(query, user)
            .then(json => {
                json.exercises.forEach(exercise => {
                    let splitDate = date.split('-')
                    let today = new Date();
                    var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0':'') + today.getMinutes() + ":" + (today.getSeconds()< 10 ? '0':'') + today.getSeconds()
                    api.postUserExercise(exercise, user, date, time)
                    .then(json => {
                        console.log(json)
                        this.setState({
                            postState: true,
                            date: `${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`
                        })
                    })
                })
                console.log(json)
            })
        }
    }

    render() {
        let menu
        let link
        if (this.state.menu === "food"){
        menu = 
            <form className="userForm" onSubmit={(event) => this.postFood(event, this.state.fields.foodInput, this.props.currentUser, this.state.fields.date, this.state.meal)}>
                <h3>Submit a food post with speech recognition</h3>
                <label> Date:
                    <input onChange={this.handleChange} type="date" name="date" /> 
                </label> <br/>
                <label> Post Food:
                    <input type="text" name="foodInput" onChange={this.handleChange}/>
                </label>
                <br></br>
                <label> Select Meal:
                <select onChange ={this.handleMenu} name="meal" id="meal-select">
                    <option value="">Select Category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        } else if (this.state.menu === "exercise") {
        menu = 
            <form className="userForm" onSubmit={(event) => this.postExercise(event, this.state.fields.exerciseInput, this.props.currentUser, this.state.fields.date)}>
                <h3>Submit an exercise post with speech recognition</h3>
                <label> Date:
                    <input onChange={this.handleChange} type="date" name="date" /> 
                </label> <br/>
                <label> Post Exercise:
                    <input type="text" name="exerciseInput" onChange={this.handleChange}/>
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        }
        else if (this.state.menu === "note") {
            menu = 
                <form className="userForm" onSubmit={(event) => this.postNote(event, this.state.fields.subject, this.state.fields.text, this.props.currentUser, this.state.fields.date)}>
                    <h3>Submit an note with speech recognition</h3>
                    <label> Date:
                        <input onChange={this.handleChange} type="date" name="date" /> 
                    </label> <br/>
                    <label> Heading:
                        <input type="text" name="subject" onChange={this.handleChange}/>
                    </label>
                    <br></br>
                    <label> Text:
                        <input type="text" name="text" onChange={this.handleChange}/>
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
        }

        if(!this.state.postState){
            link = null
        } else {
            link =  <Link to={`/daypage/${this.state.date}`}>Go to {this.state.date}</Link> 
        }


        return (
            <div>
                <h1>Post Log</h1>
                {this.state.postState ? <h2>Posted!</h2> : null}
                <select onChange ={this.handleMenu} name="menu">
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="exercise">Exercise</option>
                    <option value="note">Note</option>
                </select>
                <br></br>
                <br></br>
                
                {menu}
                <br></br>
                {link}
            </div>
        )
    }
}

export default PostPage
