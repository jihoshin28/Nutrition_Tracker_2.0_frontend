import React, { Component, useState, useEffect } from 'react'
import api from '../services/Api'
import RecordButton from '../components/RecordButton'
import { Link } from 'react-router-dom'

const PostPage = (props) => {

    let[fields, setFields] = useState({})
    let[date, setDate] = useState(null)
    let[meal, setMeal] = useState(null)
    let[posted, setPosted] = useState(false)
    let[menu, setMenu] = useState('')
    let[recordSelect, setRecordSelect] = useState('subject')
    let[text, setText] = useState('')
    let[confidence, setConfidence] = useState('')
    let[type, setType] = useState('')

    let handleMenu = (e) => {
        setMenu(e.target.value)
    }

    let handleMeal = (e) => {
        setMeal(e.target.value)
    }

    let handleRecordSelect = (e) => {
        console.log(e.target.value, recordSelect)
        setRecordSelect(e.target.value)
    }

    let setRecordResults = (text, confidence, type) => {
        console.log(type)
        let newFields = { ...fields, [type]: text };
        setFields(newFields)
        setConfidence(confidence)
        setType(type)
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
            <form className="userForm" onSubmit={(event) => postFood(event, fields.food, props.currentUser, fields.date, meal)}>
                <h3 style = {{marginBottom: '4%'}}>Submit a food post</h3>
                <label> Select Meal:
                <select onChange ={handleMeal} name="meal" id="meal-select">
                    <option value="">Select Category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </select>
                </label>
                <br></br>
                <label> Date:
                    <input onChange={handleChange} type="date" name="date" /> 
                </label> <br/>
                <div class = 'record-row'>
                    <label> Post Food:
                        <input type = "text" value = {fields.food} name="food" onChange={handleChange}/>
                    </label>
                    <RecordButton type = "food" setResults = {setRecordResults}/>
                </div>
                <h5 style = {{marginTop: '5%', fontStyle: 'italic'}}>To record press the red button and speak into your microphone</h5>
                <br></br>
                <input className = "btn btn-light" type="submit" value="Submit" />
            </form>
            
        </div>
        } else if (menu === "exercise") {
        currentMenu = 
        <div>
            <form className="userForm" onSubmit={(event) => postExercise(event, fields.exercise, props.currentUser, fields.date)}>
                <h3 style = {{marginBottom: '4%'}}>Submit an exercise post</h3>
                <label> Date:
                    <input onChange={handleChange} type="date" name="date" /> 
                </label> <br/>
                <div className = "record-row">
                    <label> Post Exercise:
                        <input type="text" value = {fields.exercise} name="exercise" onChange={handleChange}/>
                    </label>
                    <RecordButton type = "exercise" setResults = {setRecordResults}/>
                </div>
                <h5 style = {{marginTop: '5%', fontStyle: 'italic'}}>To record press the red button and speak into your microphone</h5>
                <br></br>
                <input className = "btn btn-light" type="submit" value="Submit" />
            </form>
        </div>
        }
        else if (menu === "note") {
            currentMenu = 
            <div>
                <form className="userForm" onSubmit={(event) => postNote(event, fields.subject, fields.text, props.currentUser, fields.date)}>
                    <h3 style = {{marginBottom: '4%'}}>Add a note</h3>
                    <label> Date:
                        <input onChange={handleChange} type="date" name="date" /> 
                    </label> <br/>
                    <label> Heading:
                        <input value = {fields.subject} type="text" name="subject" onChange={handleChange}/>
                    </label>
                    <br></br>
                    <label> Text:
                        <input value = {fields.text} type="text" name="text" onChange={handleChange}/>
                    </label>
                    <div className = "record-row">
                        <select onChange ={handleRecordSelect} name="record_select" id="record-select">
                            <option value="subject">Record Subject</option>
                            <option value="text">Record Text</option>
                        </select>
                        <RecordButton type = {recordSelect} setResults = {setRecordResults}/>
                    </div>
                    <h5 style = {{marginTop: '5%', fontStyle: 'italic'}}>To record press the red button and speak into your microphone</h5>
                    <br></br>
                    <input className = "btn btn-light" type="submit" value="Submit" />
                </form>

            </div>
        }

        if(!posted){
            link = null
        } else {
            link =  <Link to={`/daypage/${date}`}>Go to {date}</Link> 
        }


        return (
            <div class= "post-page">
                {posted ? <h2>Posted!</h2> : null}
                <div className = "container">
                
                <h1 style = {{marginBottom: "5%"}}>Post with Speech to Text</h1>
                <div className = "speechPostDiv">
                    <h2 style = {{marginBottom: "5%"}}>Select a category</h2>
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
                    
                    {confidence ? 
                        <div>
                            <div>
                                {`Confidence level ${confidence}`}
                                <br></br>
                                {`Recorded for ${type}`}
                            </div>
                            
                        </div> 
                    :
                    null   
                    }
                    <br></br>
                    {link}
                </div>
                </div>
            </div>
        )
    
}

export default PostPage
