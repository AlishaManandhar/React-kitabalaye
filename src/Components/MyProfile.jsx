import React from "react";
import Joi from "joi";
import image from "../images/avatar.jpg"
import NavBar from "./NavBar";

import { updateContact,updateEmail,updateProfilePicture,getMe,updatePassword } from "../services/userServices"

import ModalForm from "./common/ModalForm"
import ModalImageForm from "./common/ModalImageForm"
import ModalPassword from "./common/ModalPassword"
class MyProfile extends React.Component {
    state = {
        data: [],
        selectedFile: null,
        contact: "",
        email: "",
        password: "",
        rePassword: "",
        oldPassword: "",
        errors: {},
        isContactOpen: null,
        isEmailOpen:null,
        isImageOpen:null,
        isPasswordOpen:null

    }

    async componentDidMount(){
            const {data} = await getMe()
            const {firstname,lastname,contact,email} = data
            this.setState({
                data:{firstname,lastname,contact,email}
            })

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
        

    schema = {

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        oldPassword: Joi.string().min(8).max(150).required(),
        password: Joi.string().min(8).max(150).required(),
        rePassword: Joi.string().min(8).max(150).required(),
        contact: Joi.string()
            .regex(/^[0-9]{10}$/)
            .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
            .required(),
    };

    handleOnChange = ({ currentTarget: input }) => {
        this.setState({ [input.name]: input.value });
        const obj = { [input.name]: input.value };
        const schema = Joi.object({ [input.name]: this.schema[input.name] });
        const { error } = schema.validate(obj);
        const err =  error ? error.details[0].message : null;

        const errors = {...this.state.errors}
        if (err)
        {
            errors[input.name] = err
        }
        else{
            delete errors[input.name]
        }
        this.setState({errors})
    };

    closeModal = () => this.setState({ isContactOpen: false });
    
    closeEmailModal = () => this.setState({ isEmailOpen: false });
    
    closeImageModal = () => this.setState({ isImageOpen: false });
    closePasswordModal = () => this.setState({ isPasswordOpen: false });


    handleContactModal = () => this.setState({ isContactOpen: true });
    handleEmailModal = () => this.setState({ isEmailOpen: true });
    handleImageModal = () => this.setState({ isImageOpen: true });
    handlePasswordModal = () => this.setState({ isPasswordOpen: true });
    


    doSubmitContact = async() => {
        
        try{
            await updateContact({contact: this.state.contact})
            this.closeModal()
            window.location = "/me"
        }
        catch(e)
        {
            const error = e.response.data;
            const errors = {}
              if (error) {
                for (let item in error)
                    errors[item] = error[item]
                this.setState({
                    errors
                })
            }
        }
        
        
       
    }

    doSubmitEmail = async() => {
        
        try{
            await updateEmail({email: this.state.email})
            this.closeEmailModal()
            window.location = "/me"
        }
        catch(e)
        {
            const error = e.response.data;
            const errors = {}
              if (error) {
                for (let item in error)
                    errors[item] = error[item]
                this.setState({
                    errors
                })
            }
        }
        
        
       
    }

    doSubmitImage = async() => {
        
        let data = new FormData()
        data.append("avatar",this.state.selectedFile)
        
        try{
            const result =await updateProfilePicture(data)
            localStorage.setItem("userImage",result.data)
            this.closeImageModal()
            window.location = "/me"
          }
          catch(e)
          {
              console.log(e)
              const error = e.response.data;
              console.log(error)
              const errors = {}
              if (error) {
                for (let item in error)
                    errors[item] = error[item]
                this.setState({
                    errors
                })
            }
      
          }
        
        
       
    }

    renderButton = () => {
        return (
            <div className=" col-sm-12 col-md-4 offset-md-2">

                <button className="btn btn-success col-md-6  col-sm-5 d-md-block mb-3 mx-3 py-3"  onClick={this.handleImageModal} style={{ opacity: "0.6", borderRadius: "17% 2%" }}>Update Profile</button>
                <button className="btn btn-success col-md-6 col-sm-5 d-md-block mb-3 mx-3 py-3" onClick={this.handleEmailModal} style={{ opacity: "0.6", borderRadius: "17% 2%" }}>Change email</button>
                <button className="btn btn-success col-md-6 col-sm-5 d-md-block mb-3 mx-3 py-3" onClick={this.handleContactModal} style={{ opacity: "0.6", borderRadius: "17% 2%" }}>Change Number</button>
                <button className="btn btn-success col-md-6 col-sm-5 d-md-block mb-3 mx-3 py-3" onClick={this.handlePasswordModal} style={{ opacity: "0.6", borderRadius: "17% 2%" }}>Change password</button>
            </div>


        )
    }

    onChangeFileHandler=event=>{
        let errors = {...this.state.errors}
        if (errors.avatar)
        {
            delete errors["avatar"]
        }
        
        this.setState({
            selectedFile: event.target.files[0],
            errors
          })  
    }

    doSubmitPassword= async () =>{
        console.log(this.state)
        if (this.state.password !== this.state.rePassword) {

            let errors = { ...this.state.errors };
            errors.rePassword = "Passwords dont match";
            this.setState({ errors });
            return null;
        }
        try{
            const {oldPassword,rePassword,password} = this.state;
            await updatePassword({oldPassword,rePassword,password})
            this.closePasswordModal()
        }
        catch(e)
        {
            
            
            const errors = {}
             if (e) {
              errors["oldPassword"] = "Incorrect old Password"
              this.setState({errors})
          }
            

        }
    }


    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="container mt-5">
                    <div className="alert alert-success text-center" role="alert">
                        My Profile Details
                    </div>
                    <div className="row px-3">
                        <div className="col-sm-12 col-md-4 alert alert-success px-3 ">
                            <div className="text-center">
                            <img src={this.handleImage()}  alt="Profile" width="80%" height="250px" style={{objectFit:"center"}}/>
                            </div>
                            {this.state.data &&
                            <div className="col-12 mt-3">
                                <p className="mx-5"><strong>FirstName:</strong>&nbsp;  {this.state.data.firstname}</p>
                                <p className="mx-5"><strong>LastName:</strong>&nbsp; {this.state.data.lastname}</p>
                                <p className="mx-5"><strong>Email:</strong>&nbsp; {this.state.data.email}</p>
                                <p className="mx-5"><strong>Contact:</strong>&nbsp; {this.state.data.contact}</p>
                            </div>
    }

                        </div>

                        {this.renderButton()}
                        <ModalForm
                            show={this.state.isContactOpen}
                            title="Change Contact"
                            label="Please enter contact number"
                            name="contact"
                            value={this.state.contact}
                            onChange={this.handleOnChange}
                            error={this.state.errors.contact}
                            acceptTitle="Save Changes"
                            rejectTitle="Cancel"
                            accept={this.doSubmitContact}
                            reject={this.closeModal}
                            close={this.closeModal}

                        />

                         <ModalForm
                            show={this.state.isEmailOpen}
                            title="Change Email"
                            label="Please enter email address"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleOnChange}
                            error={this.state.errors.email}
                            acceptTitle="Save Changes"
                            rejectTitle="Cancel"
                            accept={this.doSubmitEmail}
                            reject={this.closeEmailModal}
                            close={this.closeEmailModal} />

                        <ModalImageForm
                            show={this.state.isImageOpen}
                            title="Change Profile Photo"
                            label="Image"
                            name="avatar"
                            onChange={this.onChangeFileHandler}
                            error={this.state.errors.avatar}
                            
                            accept={this.doSubmitImage}
                            reject={this.closeImageModal}
                            close={this.clossImageModal}
                        />

                        <ModalPassword
                            show={this.state.isPasswordOpen}
                            title="Change Password"
                            onChange={this.handleOnChange}
                            error1={this.state.errors.oldPassword}
                            error2={this.state.errors.password}
                            error3={this.state.errors.rePassword}
                            old={this.state.oldPassword}
                            new={this.state.password}
                            re={this.state.rePassword}
                            accept={this.doSubmitPassword}
                            reject={this.closePasswordModal}
                            close={this.closePasswordModal}

                        />



                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default MyProfile;