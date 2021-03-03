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
                
                <div className = "card exercise-card">

                    <div className="exercise-text">
                        <p>Subject: {this.props.note.subject}</p>
                        <p>Text: {this.props.note.text}</p>
                    </div>
                
                    <div style = {{display: 'flex'}}>
                        <button style = {{marginRight: '5%'}} className="btn btn-warning" onClick = {this.editNote}>Edit</button>
                        <button className="btn btn-danger" onClick ={this.deleteNote}>Delete</button>
                    </div>
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
