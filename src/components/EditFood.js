import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

export class FoodEdit extends Component {
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
        console.log(id)
        event.preventDefault()
        api.editUserFood(this.state.fields, id)
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
                <h1>Edit Food</h1>
                {this.state.editState ? <h2>Editted!</h2> : null}
                <form className="foodEditForm" onSubmit={(event) => this.handleSubmit(event, this.props.location.state.id)}>
                    <label> Name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                    </label> <br/>
                    <label> Calories Consumed:
                    <input type="text" name="calories" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Fat:
                    <input type="text" name="fat" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Protein:
                    <input type="text" name="protein" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Carbs:
                    <input type="text" name="carbs" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Potassium:
                    <input type="text" name="potassium" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Sugar:
                    <input type="text" name="sugar" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Sodium:
                    <input type="text" name="sodium" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Saturated Fat:
                    <input type="text" name="saturated_fat" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Cholesterol:
                    <input type="text" name="cholesterol" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Dietary Fiber:
                    <input type="text" name="dietary_fiber" onChange={this.handleChange}/> 
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
                <br></br>
                <Link to={`/daypage/${this.props.location.state.date}`}>Go back to {this.props.location.state.date}</Link>
            </div>
        )
    }
}

export default FoodEdit
