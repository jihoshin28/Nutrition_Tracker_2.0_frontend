import React, { Component } from 'react'
import ExerciseCard from './ExerciseCard'

export class ExerciseList extends Component {
    render() {
        return (
            <div>
                {this.props.exercises.map(exercise => <ExerciseCard prop = {this.props.props} key = {exercise.id} id = {exercise.id} exercise = {exercise.attributes} />)}
            </div>
        )
    }
}

export default ExerciseList
