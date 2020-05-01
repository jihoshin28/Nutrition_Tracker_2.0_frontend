import React, { Component } from 'react'
import api from '../services/Api'
import WeightGraph from '../components/WeightGraph'

export default class ProfilePage extends Component {
    constructor(){
        super()
        this.state = {
            current_user: null,
            fields: [],
            graph_type: null,
            weights: null
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token');
        if (token) {
            api.getCurrentUser().then(json => {
            let user = json.user.data.attributes;
            this.setState({
                current_user: user
            })
            console.log(this.state.current_user)
                api.getUserWeights(user.id).then(json => {
                    let userWeights = []
                    console.log(json.data)
                    json.data.forEach(element => userWeights.push(element.attributes))
                    this.setState({
                        weights: userWeights
                    })
                    console.log(this.state.weights)
                })
            })
            
        }
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    deleteUser = () => {
        let answer = window.confirm("Are you sure? This will delete all of your posts.")
        if (answer) {
            api.deleteUser(this.props.currentUser.id)
            .then(json => { console.log(json) })
            alert("Deleted!")
            this.props.handleLogout()
            this.props.history.push('/about')
        } 
    }

   
    editUser = () => {
        this.props.history.push({
            pathname: "/edituser",
            state: {
                id: this.props.currentUser.id
            },
            
        })
    }

    handleChange = (e) => {
        let newField = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({
            fields: newField
        })
        console.log(this.state.fields)
    }

    handleSubmit = (e) => {
        console.log(this.props.currentUser.id, parseInt(this.state.fields.weight,10), this.state.fields.date)
        e.preventDefault()
        api.postUserWeight(this.state.current_user, parseInt(this.state.fields.weight, 10), this.state.fields.date)
        .then(json => console.log(json))
    }

    render() {
        let userData 
        let user
        let current_user
        let yearSelect
            if(!!this.state.current_user){
                // console.log(this.state.current_user)
                let image 
                current_user = this.state.current_user
                if(!!this.state.current_user.image){
                    image = this.state.current_user.image
                } else {
                    image = "https://clipartart.com/images/default-profile-picture-clipart-3.jpg"
                }
                user = this.capitalize(this.state.current_user.first_name)
                userData = 
                <div>
                    <p>User Info</p>
                    <div>
                        <img width = "350px" src ={image}></img>
                    </div>
                    <p>Age: {this.state.current_user.age}</p>
                    <p>Weight: {this.state.current_user.weight} pounds</p>
                    <p>Height: {this.state.current_user.height} inches</p>
                    <p>Calorie Goal: {this.state.current_user.calorie_goal}</p>
                    <p>Diet: {this.state.current_user.diet_type}</p>
                    <p>Bio: {this.state.current_user.bio}</p>
                </div>
                if(this.state.fields.timeline === "year"){
                    yearSelect = 
                    <div>
                        <h2>Enter a Year</h2>
                        <div>
                            <input type= "integer"></input>
                        </div>      
                    </div>
                } else {
                    yearSelect = <div></div>
                }
            } else {
                userData = 'Loading...'
            }

            

        return (
            <div>
                <br></br>
                <h1>Welcome {user}</h1>
                <br></br>
                    <div className = "exercise-plan-container">
                        <div>
                        <h3>{userData}</h3>
                        </div>
                        <button className="secondary-bttn" onClick = {this.editUser}>Edit Profile</button>
                        <button className="secondary-bttn" onClick = {this.deleteUser}>Delete Account</button>
                    </div>
                    <div className = "exercise-plan-container">
                    <h1>Weight tracker</h1>
                    <h2>Enter your weight</h2>
                    <form onSubmit = {(e) => this.handleSubmit(e)}>
                        <label>
                            Date:
                        </label>
                        <input name = "date" type = "date" onChange = {this.handleChange}>
                        </input>
                        <br></br>
                        <label>
                            Weight:
                        </label>
                        <input name = "weight" type = "number" placeholder = "Enter weight!" onChange = {this.handleChange}>
                        </input>
                        <br></br>
                        <input type ="submit"></input>
                    </form>
                    <br></br>
                    </div>
                    <div className = "exercise-plan-container">
                        <h2>Select a timeline</h2>
                        <select name = "timeline" onChange = {(e) => this.handleChange(e)}>
                            <option value = "">Select a Timeline</option>
                            <option value = "week">Week</option>
                            <option value = "month">Month</option>
                            <option value = "year">Year</option>
                        </select>
                        {yearSelect}

                        <WeightGraph weights = {this.state.weights} user = {current_user} timeline = {this.state.fields.timeline}/>
                    </div>

                <br></br>
                
            </div>
                
        )
    }
}

