import React, { Component } from "react";
import  Alert from  "./common/Alert"
import { Link } from "react-router-dom";

import NavBar from "./NavBar"
import {getBooks} from "../services/bookService"
class Books extends Component {
    state = {
        books: [],
        message: null
    };

    async componentDidMount() {
        try{
            const {data} = await getBooks()
            this.setState({ books:data })

            if (data.length === 0)
                this.setState({message:true})
        }
        catch(e)
        {
            console.log(e)
        }
        
    }

   

    renderBooks = () => {
        
        const { books } = this.state;
        return books.map((book, count) => (
            <div className="col-6 col-lg-3 col-md-4 mb-4" key={count}>
                <div className="card">
                    <img src={"http://localhost:8000/images/" +book.image} height="200px" style={{objectFit: 'cover'}} className="card-img-top" alt="..." />
                    <div className="card-body" style={{backgroundColor:"rgb(238 241 243)"}} >
                        <h3 className="card-title font-xs"><strong> {book.bookName}</strong></h3>
                        <p className="card-text font-xs" style={{height:"auto"}}>
                            
                            Price: <strong>Rs. {book.price}</strong> &nbsp; &nbsp;&nbsp;&nbsp;
                            
                            Stock: <strong>{book.stock}</strong><br/>
                            
                        
                             Negotiable: <strong className="text-danger"> {book.negotiable=== true? "Yes":"No"}</strong>
                        </p>
                        <Link to={"/books/" + book._id}>
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                <strong> Details</strong>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        ));
    };

    render() {
        return (
            <React.Fragment>    
            <NavBar />
            <div className="container">
            {this.state.books.length === 0 && !this.state.message && (
                        <div
                            className="text-center"
                            style={{ marginTop: "150px", height: "90vh" }}
                        >
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {this.state.books.length === 0 &&
                        this.state.message &&
                        <Alert title="Sorry, books not available..." />}
                    
                    <div className="row mt-5">
                        {this.state.books.length > 0 && this.renderBooks()}
                    </div>
                    
               
               </div>
        </React.Fragment>
                
           
        );
    }
}

export default Books;