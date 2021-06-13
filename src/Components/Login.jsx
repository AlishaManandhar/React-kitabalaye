import React from "react";
import Joi from "joi";
import { login,authCheck} from "../services/userServices"
import LandingPage from "./LandingPage"
import Form from "./common/Form";
import { NavLink } from "react-router-dom"


class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
  };

  doSubmit = async () => {

    let request_data = { ...this.state.data }
    try {
      const result = await login(request_data)
      const token = result.token
      const username = result.data.firstname + " " + result.data.lastname
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      localStorage.setItem('userId', result.data._id)
      localStorage.setItem('userImage', result.data.avatar)
      window.location = "/"

    }
    catch (e) {

      const error  = e.response.data;
      const errors = {}
      if (error) {
        errors['password'] = error.password
        this.setState({
          errors
        })
      }

    }
  };

  async componentDidMount(){
    if (localStorage.getItem("token"))
    {
      const {data} = await authCheck()
    if (data === true)
    
    window.location = "/"
    }
  
  }

  render() {
    return (
     
      <div className="row justify-content-center landPage">
        <LandingPage />
        <div className="col-sm-12 col-md-4">
          <form className="mt-3" onSubmit={this.handleOnSubmit} id="login-user">
            {this.renderInput("email", "email", "Email", "form-control")}

            {this.renderInput("password", "password", "Password", "form-control")}

            <button
              type="submit"
              className="btn btn-primary mb-3 col-12"
              disabled={this.validate()}
            >
              <strong>Login</strong>
            </button>
            <NavLink to="/register">
              <button
                type="button"
                className="btn btn-success mb-3 col-12"
              >
                <strong>Register</strong>
              </button>
            </NavLink>


          </form>
        </div>
      </div>
    );
  }
}

export default Login;
