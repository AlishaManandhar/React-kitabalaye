import React, { Component } from 'react'
import NavBar from "./NavBar"
import Books from "./Books"
class MainPage extends  Component{
    render(){
        return (
            <React.Fragment>
                <NavBar />
                <Books />
            </React.Fragment>
        
        )
    }
}

export default MainPage;