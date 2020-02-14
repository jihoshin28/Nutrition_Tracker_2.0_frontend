import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/Api'


export class PostExercise extends Component {
    constructor(props){
        super()
        this.state = {
            error: false,
            exerciseInput: '',
            date: props.location.state.date.date,
            posted: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state)
    }


    postExercise = (event, query, user) => {
        event.preventDefault()
        api.nutritionixGetExercise(query, user)
        .then(json => {
            json.exercises.forEach(exercise => {
                let today = new Date();
                var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0':'') + today.getMinutes() + ":" + (today.getSeconds()< 10 ? '0':'') + today.getSeconds()
                api.postUserExercise(exercise, user, this.state.date, time)
                .then(json => {
                    console.log(json)
                    this.setState({
                        posted: true
                    })
                })
            })
            console.log(json)
        })
    }

    render(){
       
        return (
            <div>
                <div>
                    <div className="form">
                        <h1> Post an Exercise!</h1>
                        {this.state.posted ? <h2>Posted!</h2> : null}
                        <form className="userForm" onSubmit={(event)=> this.postExercise(event, this.state.exerciseInput, this.props.currentUser)} >
                        <p>Submit an exercise post in plain English!</p>
                        <label> Exercise
                        <input type="text" name="exerciseInput" onChange={this.handleChange}/>
                        </label> <br/>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <br></br>
                    <Link to={`/daypage/${this.state.date}`}>Go back to {this.state.date}</Link>
                </div>
            </div>
        )
    }
}

export default PostExercise
