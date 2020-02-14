import React, { Component } from 'react'

export class Note extends Component {
    constructor(){
        super()
        this.state = {
            fields: ''
        }
    }
    handleChange = (e) => {
        this.props.handleChange(e)
    }

    handleSubmit = (event) => {
        this.props.handleSubmit(event)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <label> Note: 
                <input type="text" name="note" onChange= {this.handleChange}/>
                </label> 
                <input type="Submit" value="Submit"/> 
                
            </form>
        )
    }
}

export default Note
