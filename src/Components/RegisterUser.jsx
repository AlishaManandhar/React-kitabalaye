import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import { registerUser } from "../services/userServices"

import LandingPage from "./LandingPage"
class RegisterUser extends Form {
    state = {
        data: {
            firstname: "",
            lastname: "",
            contact: "",
            email: "",
            password: "",
            rePassword: "",
        },
        errors: {},
    };

    schema = {
        firstname: Joi.string().max(100).required(),
        lastname: Joi.string().max(100).required(),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(8).max(150).required(),
        rePassword: Joi.string().min(8).max(150).required(),
        contact: Joi.string()
            .regex(/^[0-9]{10}$/)
            .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
            .required(),
    };

    doSubmit = async () => {
        const { rePassword, password } = this.state.data;

        if (password !== rePassword) {

            let errors = { ...this.state.errors };
            errors.rePassword = "Password dont match";
            this.setState({ errors });
            return null;
        }

        try {
            const request_data = { ...this.state.data }
            await registerUser(request_data)
            window.location = "/login"


        }
        catch (e) {
            
            const { error } = e.response.data;
            const errors = {}
            if (error) {
                for (let item in error)
                    errors[item] = error[item]
                this.setState({
                    errors
                })
            }

        }

    };

    render() {
        return (
            <div className="row justify-content-center landPage">
        <LandingPage />
        <div className="col-sm-12 col-md-4">
            <form onSubmit={this.handleOnSubmit} id="create-user">
                {this.renderInput("firstname", "text", "FirstName", "form-control")}
                {this.renderInput("lastname", "text", "Lastname", "form-control")}
                {this.renderInput("email", "email", "Email", "form-control")}
                {this.renderInput("contact", "text", "Contact No.", "form-control")}
                {this.renderInput("password", "password", "Password", "form-control")}
                {this.renderInput(
                    "rePassword",
                    "password",
                    "Re-Enter Password..",
                    "form-control"
                )}
                <button
                    type="submit"
                    className="btn btn-success mb-3 col-12"
                    disabled={this.validate()}
                >
                    <strong>Register</strong>
                </button>
            </form>
            </div>
            </div>
        );
    }
}

export default RegisterUser;
