import React, { Component } from "react"

class LandingPage extends Component {
  render() {
    return (
        <React.Fragment>
        <div className="col-sm-12 d-sm-block d-md-none">
          <h2 className="themefont mt-2"><strong>DWIT Kitabalaya</strong></h2>
        </div>
        <div className="col-md-5 d-none d-md-block">
          <h3 className="themefont">Hamro</h3>
          <h1 className="themefont">Kitabalaya</h1>
          <p>
          Here at Kitabalaye we have a vast range of books, maps, 
          magazine which is very helpful to students in acquiring academic as well as general knowledge. 
          The library offers a wealth of resources and a quiet and peaceful space to study.
          Our main objective is to encourage students in reading and learning which promotes curiosity,
          innovation and critical thinking.
          </p>
        </div>
        </React.Fragment>
          
    );
  }
}

export default LandingPage;
