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
                
                    <li className="nav"><NavLink to='/todaypage'>Today</NavLink></li>
                    <li className="nav"><NavLink to="/calendar">Calendar</NavLink></li>
                    <li className="nav"><NavLink to="/profile">Profile</NavLink></li>
                    <li className="nav"><NavLink to="/about">About</NavLink></li> 
                    <li className="nav"><NavLink to="/post">Post</NavLink></li> 
                    <li className="navLogout"><NavLink to="/Nutrition_Tracker_2.0_frontend/about" onClick={props.handleLogout}>Logout</NavLink> </li> 
                </div>
                
            ) : (
                <div>
                    <li className= "nav">Nutrition Tracker</li>
                    <li className="nav"><NavLink to="/login">Login</NavLink></li> 
                    <li className="nav"><NavLink to="/signup">Signup</NavLink></li>
                    <li className="nav"><NavLink to="/about">About</NavLink></li> 
                </div>
             )}
            </ul>
        </div>
    )
}

export default NavBar