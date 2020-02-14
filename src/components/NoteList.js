import React, { Component } from 'react'
import NoteCard from './NoteCard'

export class NoteList extends Component {
    render() {
        return (
            <div>
                {this.props.notes.map(note => <NoteCard prop = {this.props.props} key = {note.id} id = {note.id} note = {note.attributes} />)}
            </div>
        )
    }
}

export default NoteList
