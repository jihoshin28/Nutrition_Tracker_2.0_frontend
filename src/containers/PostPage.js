import React, { Component, useState, useEffect } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

const grammar = '#JSGF V1.0; grammar numbers; public <number> = one | two | three | four | five | six | seven | eight| nine | ten ;'
var recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

console.log(speechRecognitionList)

const PostPage = (props, recognition) => {

    let[error, setError] = useState(false)
    let[fields, setFields] = useState(null)
    let[date, setDate] = useState(null)
    let[meal, setMeal] = useState(null)
    let[posted, setPosted] = useState(false)
    let[menu, setMenu] = useState('')
    let[transcript, setTranscript] = useState('')


    let starttalkToText = () => {
        recognition.start()
    }

    // recognition.onresult = (event) => {
    //     var result = event.results[0][0].transcript
    //     setTranscript(result)
    // }
    
    // recognition.onspeechend = () => {
    //     recognition.stop()
    // }

    let handleMenu = (e) => {
        setMenu(e.target.value)
    }

    let handleMeal = (e) => {
        setMeal(e.target.value)
    }

    let handleChange = (e) => {
        const newFields = { ...fields, [e.target.name]: e.target.value };
        setFields( newFields );
        console.log(fields)
    }

    let postNote = (event, subject, text, user, date) => {
        event.preventDefault()
        if(!date || !subject || !text){
            alert("Please Fill In Required Fields!")
        } else {
            let splitDate = date.split('-')
            api.postUserNote(subject, text, user, date)
            .then(json => {
                console.log(json)
                setPosted(true)
                setDate(`${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`)
            })
        }
    }

    let postFood = (event, query, user, date, meal) => {
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
                        setPosted(true)
                        setDate(`${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`)
                    })
                })
                console.log(json)
            })
        } 
    }

    let postExercise = (event, query, user, date) => {
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
                        setPosted(true)
                        setDate(`${splitDate[0]}-${splitDate[1].split('')[1]}-${splitDate[2].split('')[1]}`)
                    })
                })
                console.log(json)
            })
        }
    }

    
        let currentMenu
        let link
        if (menu === "food"){
        currentMenu = 
        <div>
            <form className="userForm" onSubmit={(event) => postFood(event, fields.foodInput, props.currentUser, fields.date, meal)}>
                <h3>Submit a food post with speech recognition</h3>
                <label> Date:
                    <input onChange={handleChange} type="date" name="date" /> 
                </label> <br/>
                <label> Post Food:
                    <input type="text" name="foodInput" onChange={handleChange}/>
                </label>
                <br></br>
                <label> Select Meal:
                <select onChange ={handleMeal} name="meal" id="meal-select">
                    <option value="">Select Category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
            <div style = {{marginTop: '2%'}}>
                <button onClick = {() => starttalkToText()} className = 'btn btn-primary'>Click to start speech to text</button>
            </div>
        </div>
        } else if (menu === "exercise") {
        currentMenu = 
        <div>
            <form className="userForm" onSubmit={(event) => postExercise(event, fields.exerciseInput, props.currentUser, fields.date)}>
                <h3>Submit an exercise post with speech recognition</h3>
                <label> Date:
                    <input onChange={handleChange} type="date" name="date" /> 
                </label> <br/>
                <label> Post Exercise:
                    <input type="text" name="exerciseInput" onChange={handleChange}/>
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
            <div style = {{marginTop: '2%'}}>
                <button onClick = {() => starttalkToText()} className = 'btn btn-primary'>Click to start speech to text</button>
            </div>
        </div>
        }
        else if (menu === "note") {
            currentMenu = 
            <div>
                <form className="userForm" onSubmit={(event) => postNote(event, fields.subject, fields.text, props.currentUser, fields.date)}>
                    <h3>Submit an note with speech recognition</h3>
                    <label> Date:
                        <input onChange={handleChange} type="date" name="date" /> 
                    </label> <br/>
                    <label> Heading:
                        <input type="text" name="subject" onChange={handleChange}/>
                    </label>
                    <br></br>
                    <label> Text:
                        <input type="text" name="text" onChange={handleChange}/>
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>
                <div style = {{marginTop: '2%'}}>
                    <button onClick = {() => starttalkToText()} className = 'btn btn-primary'>Click to start speech to text</button>
                </div>

            </div>
        }

        if(!posted){
            link = null
        } else {
            link =  <Link to={`/daypage/${date}`}>Go to {date}</Link> 
        }


        return (
            <div>
                <h1>Post Log</h1>
                {posted ? <h2>Posted!</h2> : null}
                <select onChange ={handleMenu} name="menu">
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="exercise">Exercise</option>
                    <option value="note">Note</option>
                </select>
                <br></br>
                <br></br>
                
                {currentMenu}
                <br></br>
                {transcript}
                <br></br>
                {link}
            </div>
        )
    
}

export default PostPage
