import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/Api'

export class PostPage extends Component {
    constructor(props){
        super()
        this.state = {
            error: false,
            meal: props.location.state.meal,
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

    postFood = (event, query, user) => {
        event.preventDefault()
        api.nutritionixGetFood(query, user)
        .then(json => {
            json.foods.forEach(food => {
                var today = new Date();
                var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0':'') + today.getMinutes() + ":" + (today.getSeconds()< 10 ? '0':'') + today.getSeconds()
                console.log(time)
                api.postUserFood(food, user, this.state.meal, this.state.date, time)
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

    render() {
        let meal
            if (this.state.meal === 'breakfast'){
                meal = "Breakfast"
            } else if (this.state.meal === 'lunch'){
                meal = "Lunch"
            } else if (this.state.meal === 'dinner'){
                meal = "Dinner"
            }
        
        return (

            <div>
                <div>
                    <div className="form">
                        <h1> Post a {meal} Item!</h1>
                        {this.state.posted ? <h2>Posted!</h2> : null}
                        <form className="userForm" onSubmit={(event) => this.postFood(event, this.state.foodInput, this.props.currentUser, this.state.meal)}>
                        <p>Submit a food post in plain English!</p>
                        <label> Post Food
                        <input type="text" name="foodInput" onChange={this.handleChange}/>
                        </label>
                         <br/>
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

export default PostPage
