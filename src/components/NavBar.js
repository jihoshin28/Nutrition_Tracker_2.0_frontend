import React from 'react';
import { NavLink } from 'react-router-dom';


function NavBar(props) {
    let loggedIn = !!props.currentUser.id

    return (
        
        <div className="navBar">
            
            <ul>
               
            {loggedIn ? (  
                <div>
                    <li className= "nav">Nutrition Tracker</li>
                
                    <li className="nav"><NavLink to='/Nutrition_Tracker_2.0/todaypage'>Today</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/calendar">Calendar</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/profile">Profile</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/about">About</NavLink></li> 
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/post">Post</NavLink></li> 
                    <li className="navLogout"><NavLink to="/Nutrition_Tracker_2.0/about" onClick={props.handleLogout}>Logout</NavLink> </li> 
                </div>
                
            ) : (
                <div>
                    <li className= "nav">Nutrition Tracker</li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/login">Login</NavLink></li> 
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/signup">Signup</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0/about">About</NavLink></li> 
                </div>
             )}
            </ul>
        </div>
    )
}

export default NavBar