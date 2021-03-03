import React, { Component } from 'react'
import api from '../services/Api'
import NoteForm from '../components/NoteForm'

export class ExerciseCard extends Component {
    constructor(props) {
        super();
        this.state= {
            deleted: false,
            noteStatus: false,
            note: props.exercise.note,
            fields: null
        }
    }

    deleteExercise = () => {
        api.deleteUserExercise(this.props.id)
        .then(json => {
            console.log(json)
            this.setState({
                deleted: true
            })
        })
    }

    editExercise = () => {
        this.props.prop.history.push({
            pathname: "/editexercise",
            state: {
                id: this.props.id,
                date: this.props.exercise.date
            }
        })
    }

    handleChange = (e) => {
        let newFields = {...this.state.fields, [e.target.name]: e.target.value}
        this.setState({
            fields: newFields
        })
        console.log(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.props.id)
        if(this.state.fields === null){
            alert("Hey type something!")
        } else {
            api.editExerciseNote(this.state.fields, this.props.id)
            .then(json => {
                console.log(json)
                this.setState({
                    noteStatus: true,
                    note: this.state.fields.note
                })
            })
        }
    }

    noteButton = () => {
        this.setState({
            note: "",
            fields: null
        })
    }


    render() { 
        let deleted = this.state.deleted
        let note
        if(this.state.note === ""){
            note = <NoteForm id ={this.props.exercise.id} handleChange ={this.handleChange} handleSubmit = {(event) => this.handleSubmit(event)}/>
        } else {
            note = <div className ="exercise-note">
                    <p>Note:</p>
                    <p>{this.state.note}</p>
                    <button onClick={this.noteButton}>Edit Note</button>
                </div>     
        }
        return (
            deleted === false ? (
            <div>
                <div className= "exercise-card">
                    <div>
                        <h1>Map Here!</h1>
                    </div>
                    <div className="exercise-text">
                        <p>Exercise: {this.props.exercise.name}</p>
                        <p>Calories Burned: {this.props.exercise.calories} calories burned</p>
                    </div>
                    <div>
                        {note}
                    </div>
                    <div> 
                        <button className="btn btn-warning" onClick = {this.editExercise}>Edit</button>
                        <button className="btn btn-danger" onClick = {this.deleteExercise}>Delete</button>
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

export default ExerciseCard
