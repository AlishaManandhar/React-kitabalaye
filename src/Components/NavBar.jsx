import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {logout} from "../services/userServices"
import image from "../images/avatar.jpg"
class NavBar extends Component {
 
  handleLogout = async()=>{
      try{
         await logout()
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('userImage')
      
      window.location = "/login"

      }
      catch(e)
      {
        console.log(e)
      }
     
      
  }

  handleImage = () => {
  
    if (localStorage.getItem("userImage"))
    {
      if (localStorage.getItem("userImage") !== "false")
      return "http://localhost:8000/images/" + localStorage.getItem("userImage") 
      else
      return  image
      
    }
    return image
    
  }
    

  render() {
    return (
        <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <NavLink to="/" className="navbar-brand">
          <h4>
            <strong className="pl-2" style={{ color: "rgb(25, 25, 99)" }}>
             
              Kitabalaya
            </strong>
          </h4>
        
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-4">
            <li className="nav-item mx-5 px-2">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-5 px-2">
            <NavLink className="nav-link" to="/addbook">
                Addbook
              </NavLink>
            </li>
            <li className="nav-item mx-5 px-2">
              <NavLink className="nav-link" to="/history">
                History
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-5  px-2">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={this.handleImage()} className="rounded-circle border border-light" alt="..." style={{width:"30px", height:"30px",objectFit:"cover"}}/> {localStorage.getItem('username')}
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/me">
                  Profile
                </NavLink>
                <li className="dropdown-item"  onClick={this.handleLogout}>
                  Logout
                </li>
              </div>
            </li>
          </ul>
         </div>
      </nav>
    

    </React.Fragment>
    );
  }
}

export default NavBar;
