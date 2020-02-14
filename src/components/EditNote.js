import React, { Component } from 'react'
import api from '../services/Api'
import { Link } from 'react-router-dom'

export class NoteEdit extends Component {
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
        api.editUserNote(this.state.fields, id)
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
                <h1>Edit Note</h1>
                {this.state.editState ? <h2>Editted!</h2> : null}
                <form className="noteEditForm" onSubmit={(event) => this.handleSubmit(event, this.props.location.state.id)}>
                    <label> Username
                    <input type="text" name="subject" onChange={this.handleChange}/>
                    </label> <br/>
                    <label> Password
                    <input type="text" name="text" onChange={this.handleChange}/> 
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
                <br></br>
                <Link to={`/daypage/${this.props.location.state.date}`}>Go back to {this.props.location.state.date}</Link> 

            </div>
            
        )
    }
}

export default NoteEdit
