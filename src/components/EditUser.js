import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

export class EditUser extends Component {
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
        api.editUser(this.state.fields, id)
        .then(json => {
            console.log(json)
            console.log(this.props)
            this.setState({
                editState: true
            })
        })
        console.log(id)
    }

    render() {
        return (
            <div>
                <h1>Edit User Info</h1>
                {this.state.editState ? <h2>Editted!</h2> : null}
                <form className="foodEditForm" onSubmit={(event) => this.handleSubmit(event, this.props.location.state.id)}>
                    <label> Username:
                    <input type="text" name="username" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Weight:
                    <input type="text" name="weight" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Height:
                    <input type="text" name="height" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Calorie Goal:
                    <input type="text" name="calorie_goal" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Diet:
                    <input type="text" name="diet_type" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Image:
                    <input type="text" name="image" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Bio:
                    <input type="text" name="bio" onChange={this.handleChange}/> 
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
                <br></br>
                <Link to={`/profile`}>Go back to Profile Page</Link>
            </div>
        )
    }
}

export default EditUser
