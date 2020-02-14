import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

export class ExerciseEdit extends Component {
    constructor() {
        super();
        this.state= {
            error: false,
            fields: {},
            editState: false
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
        console.log(this.state)
    }

    handleSubmit = (event, id) => {
        event.preventDefault()
        
        api.editUserExercise(this.state.fields, id)
        .then(json => {
            this.setState({
                editState: true
            })
            console.log(json)
        })
        console.log(id)
    }
    render() {
        return (
            <div>
                <h1>Edit Exercise</h1>
                {this.state.editState ? <h2>Editted!</h2> : null}
                <form className="exerciseEditForm" onSubmit={(event) => this.handleSubmit(event, this.props.location.state.id)}>
                    <label> Name: 
                    <input type="text" name="name" onChange={this.handleChange}/>
                    </label> <br/>
                    <label> Calories Burned: 
                    <input type="text" name="calories" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label>Unit: 
                    <input type="text" name="unit" onChange={this.handleChange}/> <br/>
                    </label>
                    <label> Unit Number: 
                    <input type="text" name="unit_number" onChange={this.handleChange}/> 
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
                <br></br>
                <Link to={`/daypage/${this.props.location.state.date}`}>Go back to {this.props.location.state.date}</Link>
            </div>
        )
    }
}

export default ExerciseEdit
