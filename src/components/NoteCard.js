import React, { Component } from 'react'
import api from '../services/Api'

export class NoteCard extends Component {
    constructor() {
        super();
        this.state= {
            deleted: false
        }
    }

    deleteNote = () => {
        api.deleteUserNote(this.props.id)
        .then(json => {
            console.log(json)
            this.setState({
                deleted: true
            })
        })
    }

    editNote = () => {
        this.props.prop.history.push({
            pathname: "/editnote",
            state: {
                id: this.props.id,
                date: this.props.note.date
            },
            
        })
    }

    render() {
        let deleted = this.state.deleted
        return (
            deleted === false ? (
            <div>
                <div className= "exercise-card">
                    <div><h1>Note Here!</h1></div>
                <div className="exercise-text">
                    <p>Subject: {this.props.note.subject}</p>
                    <p>Text: {this.props.note.text}</p>
                </div>
                
                <div>
                    <button className="secondary-bttn" onClick = {this.editNote}>Edit</button>
                    <button className="secondary-bttn" onClick ={this.deleteNote}>Delete</button>
                </div>
                    <br></br>
                    
                </div>
                <br></br>
            </div>
            
            ) : (   
                <h2>Deleted!</h2>
            )
        )
    }
}

export default NoteCard
