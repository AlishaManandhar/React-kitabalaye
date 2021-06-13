import React, { Component } from 'react'

import  Login from "./Components/Login"
import RegisterUser from "./Components/RegisterUser"
import Books from "./Components/Books"
import {ToastContainer} from "react-toastify"
import AddBook from "./Components/AddBook"
import UpdateBook from "./Components/UpdateBook"
import Book from "./Components/Book"
import History from "./Components/History"

import MyProfile from "./Components/MyProfile"

import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';



class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <div className="container">
        <ToastContainer  />
          
        
        <Switch>
  
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/addbook" component={AddBook} /> 
            <Route path="/history" component={History} />
            <Route path="/me" component={MyProfile} />

            
            <Route path="/books/:id" component={Book} />
           
            <Route path="/updatebook/:id" component={UpdateBook} />

            <Route path="/" component={Books} />
            
        </Switch>
        </div> 
        
      </BrowserRouter>
      
    )
  }
}

export default App