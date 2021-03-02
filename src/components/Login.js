import React, { Component } from 'react'
import api from '../services/Api'

export class Login extends Component {

    constructor(){
        super()
        this.state = {
            error: false,
            fields: {
                username:'',
                password:''
            }
        }
    }

    handleChange = e => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
        console.log(this.state)
    };

    handleSubmit = e => {
        e.preventDefault();
        api.login(this.state.fields.username, this.state.fields.password)
        .then(json => {
            console.log(json)
          if ( json.message === "Invalid username or password" ) {
            this.setState({ error: true })
            console.log(this.state.error)
          } else {
              console.log(json)
            this.props.handleLogin(json);
            this.props.history.push(`/daypage/${this.props.currentDate}`);
          };
        });
      };
    
    render() {
        return (
            <div>
                <div>
                    <div className="login">
                        <h1> Login:</h1>
                        {this.state.error ? <h2>Try Again</h2> : null}
                        <form className="loginForm" onSubmit={this.handleSubmit}>
                        <label> Username
                        <input type="text" name="username" onChange={this.handleChange}/>
                        </label> <br/>
                        <label> Password
                        <input type="password" name="password" onChange={this.handleChange}/> 
                        </label> <br/>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
