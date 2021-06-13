import React from "react";
import Joi from "joi";
import image from "../images/bgimage.svg"
import NavBar from "./NavBar";
import Form from "./common/Form";
import { getBook,updateBook } from "../services/bookService"


class UpdateBook extends Form {
    state = {
        data: "Hello",
        errors: {},
    };

    schema = {
        bookName: Joi.string().max(150).required(),
        author: Joi.string().max(150).required(),
        publication: Joi.string().max(150).required(),
        isbn: Joi.string().min(13).max(13).required(),
        price: Joi.number().min(20).required(),
        stock: Joi.number().min(1).max(15).required(),
        edition: Joi.number().min(1).max(15).required(),
        year: Joi.number().integer().min(1980).max(2021).required(),
        negotiable: Joi.required(),

    };
    async componentDidMount() {
        const id = this.props.match.params.id;
        try {
            let { data } = await getBook(id);
            data["negotiable"] = data["negotiable"] === true ? "true" : "false"
            
            const {bookName,negotiable, author,publication, isbn,price,stock,edition,year} = data
            data = {bookName,negotiable, author,publication, isbn,price,stock,edition,year}
            
            this.setState({ data });
        }
        catch (e) {
            console.log(e)
        }
    }



    doSubmit = async() => {
        
        try{
            const id = this.props.match.params.id;

            const request_data = {...this.state.data}
            request_data["year"] = request_data["year"].toString()
            await updateBook(request_data,id)
            window.location = "/history"
            
      
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

    renderNogotiable= ()=> {
        const value = [{
            value:"true",
            content:"Yes"
            },{
                value:"false",
                content:"No"
                }]
                return (
        <div className="form-control">
        <span>Negotiable: &nbsp; </span>
        
        
        {value.map(val => {
                return (
                <div className="form-check form-check-inline" key={val.value}>
                <input
                    className="form-check-input"
                    type="radio"
                    name="negotiable"
                    id={val.value}
                    
                    onChange={(e) => this.handleOnChange(e)}
                    value={val.value}
                    checked={this.state.data.negotiable === val.value}
                />
                <label
                    className="form-check-label"
                    htmlFor={val.value}
                >
                    {val.content}
                </label>
            </div>
                )
           
            
        })}
         </div>
                )
  
    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                {this.state.data !== "Hello" && (
                    <div className="row addbookBody mx-1">
                        <div className="col-lg-4  d-lg-inline d-none">
                            <img src={image} alt="img" width=
                                "500px" height="600px" />
                        </div>
                        <form
                            className="col-sm-12 col-lg-4 mt-3 mx-auto"
                            onSubmit={this.handleOnSubmit}
                            id="update-book"
                        >
                            <h2 className="text-center col-lg-8  col-sm-12 py-3">
                                <strong className="themefont">Update Book</strong>
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
                                "Publication",
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
                            {this.renderNogotiable()}



                            <button
                                type="submit"
                                className="btn btn-primary mt-3 col-12"
                            >
                                <strong>Update Book</strong>
                            </button>

                        </form>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default UpdateBook;