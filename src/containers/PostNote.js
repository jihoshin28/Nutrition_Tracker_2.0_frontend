import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/Api'


export class PostNotePage extends Component {
    constructor(props){
        super()
        this.state = {
            error: false,
            fields: {},
            date: props.location.state.date.date,
            posted: false
        }
    }

    handleChange = (e) => {
        let newFields = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({
            fields: newFields
        })
        console.log(this.state)
    }

    postNote = (event,subject, text, user) => {
        event.preventDefault()
            api.postUserNote(subject, text, user, this.state.date)
            .then(json => {
                console.log(json)
                this.setState({
                    posted: true
                })
            })
    }
    render() {
        
        return (
            <div>
                <div>
                    <div className="form">
                        <h1> Post an Note!</h1>
                        {this.state.posted ? <h2>Posted!</h2> : null}
                        <form className="userForm" onSubmit={(event) => this.postNote(event, this.state.fields.subject, this.state.fields.text, this.props.currentUser)}>
                        <label> Heading:
                        <input type="text" name="subject" onChange={this.handleChange}/>
                        </label> <br/>
                        <label> Text:
                        <input type="text" name="text" onChange={this.handleChange}/>
                        </label> <br/>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>

                    <br></br>
                    <Link to={`/daypage/${this.state.date}`}>Go back to {this.state.date}</Link>                </div>
            </div>
        )
    }
}

export default PostNotePage
