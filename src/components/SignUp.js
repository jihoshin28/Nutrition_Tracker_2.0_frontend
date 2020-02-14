import React, { Component } from 'react'
import api from '../services/Api'

export class SignUp extends Component {
    constructor() {
        super();
        this.state= {
            error: false,
            fields: {}
        }
    }

    handleChange = (e) => {
        const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
        this.setState({ fields: newFields });
        console.log(this.state)
    }

    handleSubmit = e => {
        e.preventDefault();
        let signUpInfo = this.state.fields
        api.signUp(signUpInfo)
        .then(json => {
          if ( json.error ) {
            this.setState({ error: true })
          } else {
            this.props.handleLogin(json);
            this.props.history.push('/todaypage');
          };
        });
      };

    render() {
        return (
            <div className="signup">
                <h1> Sign Up</h1>
                {this.state.error ? <h3>Invalid Inputs, try again</h3> : null}
                <form className="signUpForm" onSubmit={this.handleSubmit}>
                    <label> Username
                    <input type="text" name="username" onChange={this.handleChange}/>
                    </label> <br/>
                    <label> Password
                    <input type="password" name="password" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label>Confirm Password
                    <input type="password" name="passwordConfirmation" onChange={this.handleChange}/> <br/>
                    </label>
                    <label> First Name
                    <input type="text" name="first_name" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Last Name
                    <input type="text" name="last_name" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Image
                    <input type="text" name="image" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Age
                    <input type="text" name="age" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Diet Type
                    <input type="text" name="diet_type" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Weight
                    <input type="text" name="weight" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Gender
                    <select name="gender" id="gender" onChange={this.handleChange}>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    </label> <br/>
                    <label> Height
                    <input type="text" name="height" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Email
                    <input type="text" name="email" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Daily Calorie Goal
                    <input type="text" name="calorie_goal" onChange={this.handleChange}/> 
                    </label> <br/>
                    <label> Bio
                    <input type="text" name="bio" onChange={this.handleChange}/> 
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
    )
    }
}

export default SignUp
