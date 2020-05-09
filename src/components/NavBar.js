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
                
                    <li className="nav"><NavLink to='/Nutrition_Tracker_2.0_frontend/todaypage'>Today</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/calendar">Calendar</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/profile">Profile</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/about">About</NavLink></li> 
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/post">Post</NavLink></li> 
                    <li className="navLogout"><NavLink to="/Nutrition_Tracker_2.0_frontend/about" onClick={props.handleLogout}>Logout</NavLink> </li> 
                </div>
                
            ) : (
                <div>
                    <li className= "nav">Nutrition Tracker</li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/login">Login</NavLink></li> 
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/signup">Signup</NavLink></li>
                    <li className="nav"><NavLink to="/Nutrition_Tracker_2.0_frontend/about">About</NavLink></li> 
                </div>
             )}
            </ul>
        </div>
    )
}

export default NavBar