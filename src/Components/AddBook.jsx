import React from "react";
import Joi from "joi";
import image from "../images/bgimage.svg"

import NavBar from "./NavBar";
import Form from "./common/Form";
import {addBook} from "../services/bookService"

class AddBook extends Form {
    state = {
        data: {
            bookName: "",
            price: "",
            author: "",
            edition: "",
            stock: "",
            publication: "",
            isbn: "",
            negotiable:false,
            year: "",
        },
        selectedFile:null,
        errors: {},
    };

    schema = {
        bookName: Joi.string().max(150).required(),
        author: Joi.string().max(150).required(),
        publication: Joi.string().max(150).required(),
        isbn: Joi.string().min(13).max(13).required(),
        price: Joi.number().min(20).required(),
        stock: Joi.number().min(1).max(15).required(),
        edition: Joi.number().min(1).max(11).required(),
        year: Joi.number().integer().min(1980).max(2021).required(),
        negotiable: Joi.boolean().required()
        
    };

    doSubmit = async () => {
        let request_data = { ...this.state.data }
        let data = new FormData()
        data.append("image",this.state.selectedFile)
        for(let item in request_data)
           data.append([item],request_data[item])
        
      
        try{
           await addBook(data)
            data = {...this.state.data}
            for(let item in data)
                    data[item]= ""
            
            this.setState({data, selectedFile:""})
      
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
    onChangeFileHandler=event=>{
        let errors = {...this.state.errors}
        if (errors.image)
        {
            delete errors["image"]
        }
        let data = {...this.state.data}
        this.setState({
            selectedFile: event.target.files[0],
            data,
            errors
          })
        
       
    
    }


    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="row addbookBody mx-1">
                    <div className="col-lg-4  d-lg-inline d-none">
                        <img src={image} alt="img" width=
                            "500px" height="600px" />
                    </div>
                    <form
                        className="col-sm-12 col-lg-4 mt-3 mx-auto" encType="multipart/form-data"
                        onSubmit={this.handleOnSubmit}
                        id="create-book"
                    >
                        <h2 className="text-center col-lg-8  col-sm-12 py-3">
                            <strong className="themefont">Add Book</strong>
                        </h2>

                        {this.renderInput(
                            "bookName",
                            "text",
                            "BookName",
                            "form-control"
                        )}

                        {this.renderInput(
                            "author",
                            "text",
                            "Author",
                            "form-control"
                        )}
                        {this.renderInput(
                            "publication",
                            "text",
                            "Publication...",
                            "form-control"
                        )}
                        {this.renderInput(
                            "isbn",
                            "text",
                            "Isbn",
                            "form-control"
                        )}
                        {this.renderInput(
                            "edition",
                            "number",
                            "Edition",
                            "form-control"
                        )}
                        {this.renderInput(
                            "price",
                            "number",
                            "Price",
                            "form-control"
                        )}
                        {this.renderInput(
                            "stock",
                            "number",
                            "Stock",
                            "form-control"
                        )}
                        {this.renderInput(
                            "year",
                            "number",
                            "Year",
                            "form-control"
                        )}
                        <div className="mb-3">
                            <label className="input-group-text" htmlFor="File01">Image of Book</label>
                            <input type="file" accept="image/*" className="form-control" id="File01" name="file" onChange={this.onChangeFileHandler}/>
                            {this.state.errors.image && <div className="text-danger mt-2 mx-3"><br />{this.state.errors.image}</div>}
                        </div>

                        <div className="form-control">
                            <span>Negotiable: &nbsp; </span>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="negotiable"
                                    id="inlineRadio1"
                                    onChange={(e) => this.handleOnChange(e)}
                                    value={true}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="inlineRadio1"
                                >
                                    Yes
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="negotiable"
                                    id="1"
                                    onChange={(e) => this.handleOnChange(e)}
                                    value={false}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="1"
                                >
                                    No
                                </label>
                            </div>
                        </div>
                        
                        <button
            type="submit"
            disabled={this.validate()}
            className="btn btn-primary mt-3 col-12"
          >
            <strong>AddBook</strong>
          </button>
                        
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default AddBook;