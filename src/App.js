import React, {Component} from 'react';
import './App.css';
import api from './services/Api.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import ProfilePage from './containers/ProfilePage';
import About from './components/About'
import Login from './components/Login';
import SignUp from './components/SignUp';
import CalendarPage from './containers/CalendarPage'
import DayPage from './containers/DayPage'
import TodayPage from './containers/TodayPage'
import PostPage from './containers/PostPage'
import PostExercise from './containers/PostExercise'
import PostNote from './containers/PostNote'
import PostFood from './containers/PostFood'
import EditExercise from './components/EditExercise'
import EditNote from './components/EditNote'
import EditFood from './components/EditFood'
import EditUser from './components/EditUser'



class App extends Component {

constructor(){
  super()
  this.state = {
    currentUser: {},
    current_date: null
  }
}

componentDidMount() {
  let today = new Date()
  let currentDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
  this.setState({
    current_date: currentDate
  })
  const token = localStorage.getItem('token');
  if(token) {
    api.getCurrentUser().then(json => {
      this.setState({ currentUser: json.user.data.attributes });
      console.log(json)
    });
  }
}

handleLogin = json => {
  const currentUser = json;
  console.log(currentUser)
  localStorage.setItem('token', currentUser.jwt );
  this.setState({ currentUser: {username: currentUser.user.data.attributes.username, id: currentUser.user.data.id }});
}

handleLogout = () => {
  localStorage.removeItem('token');
  this.setState({ currentUser: {} })
  
};
// notes for test
  render(){
  return (
    <div className="App">
      <header className="App-header">  
          <Router basename = "/">
            <div className='app'>
            <NavBar handleLogout={this.handleLogout} currentUser = {this.state.currentUser} currentDate = {this.state.currentDate}/>
            <Route exact path ="/" render={(props) => <About {...props} currentuser ={this.state.currentUser}/>} />
            <Route exact path ="/about" render={(props) => <About {...props} currentuser ={this.state.currentUser}/>} />
            <Route exact path="/login" render={(props) => <Login {...props} handleLogin={this.handleLogin}/>} currentDate = {this.state.currentDate}/>
            <Route exact path="/signup" render={(props) => <SignUp {...props} handleLogin={this.handleLogin} currentDate = {this.state.currentDate}/>} />
            <Route exact path="/profile" render ={(props) => <ProfilePage {...props} handleLogout={this.handleLogout} currentUser={this.state.currentUser}/>} />
            <Route exact path="/daypage/:date" render = {(props) => <DayPage {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/todaypage" render = {(props) => <TodayPage {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/calendar" render = {(props) => <CalendarPage {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/post" render = {(props) => <PostPage {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/postfood" render = {(props) => <PostFood {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/postexercise" render = {(props) => <PostExercise {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/postnote" render = {(props) => <PostNote {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/editfood" render = {(props) => <EditFood {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/editexercise" render = {(props) => <EditExercise {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/editnote" render = {(props) => <EditNote {...props} currentUser = {this.state.currentUser}/>}/>
            <Route exact path="/edituser" render = {(props) => <EditUser {...props} currentUser = {this.state.currentUser}/>}/>
            </div>
          </Router>
      </header>
    </div>
  );
  }
}

export default App;
