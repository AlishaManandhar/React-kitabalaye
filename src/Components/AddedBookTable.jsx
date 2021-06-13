import React, { Component } from 'react'
import { getAddedBooks,deleteBook,updateBookImage} from "../services/bookService"
import ModalCustom from "./common/ModalCustom"
import ModalImageForm from "./common/ModalImageForm"
import {NavLink} from "react-router-dom"
import Alert from "./common/Alert"

class AddedBookTable extends Component{
    state = {
        books: [],
        message: null,
        isOpen: false,
        id: null,
        bookname: null,
        isImageOpen:null,
        isDeleteOpen:null,
        errors:{}
    }
 
    closeDeleteModal = () => this.setState({ isDeleteOpen: false });

    closeImageModal = () => this.setState({ isImageOpen: false });
    handleImageModal = (id,bookname) => this.setState({ isImageOpen: true,id,bookname });
    handleDeleteModal = (id,bookname) => this.setState({ isDeleteOpen: true,id,bookname });
    
    onClickDelete = async() => {
        
        this.closeDeleteModal()
        await deleteBook(this.state.id)
        this.setState({
            message:null,
            id:null,
            bookname:null,
            books:[]
        })
    }
    async componentDidMount(){
        const {data} = await getAddedBooks()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({books:data, message})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.books.length !== this.state.books.length) {
            const {data} = await getAddedBooks()
            let message = null
            if (data.length === 0)
            {
                message = true
            }
            this.setState({books:data, message})
        }
      }

    onChangeFileHandler=event=>{
        let errors = {...this.state.errors}
        if (errors.image)
        {
            delete errors["image"]
        }
        
        this.setState({
            selectedFile: event.target.files[0],
            errors
          })  
    }
    doSubmitImage = async() => {
        
        let data = new FormData()
        data.append("image",this.state.selectedFile)
        
        try{
            const result =await updateBookImage(data,this.state.id)
            localStorage.setItem("userImage",result.data)
            this.closeImageModal()
            this.setState({
                message:null,
                id:null,
                bookname:null,
                books:[]
            })
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
    
      
      
    
    renderTable= () => {
        const columns = ["bookname", "author", "quantity", "price", "isbn", "negotiable", "image","status", "Actions", ]
        return (
            <table className="table  table-striped table-responsive">
                <thead>
                    <tr key="columns">
                        {columns.map(col => <th scope="col" key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map(book=>{
                        return(<tr key={book._id}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{book.stock}</td>
                            <td>{book.price}</td>
                            <td>{book.isbn}</td>
                            <td>{book.negotiable === true ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/images/" + book.image} width="200px" height="200px"  alt = "" style={{objectFit:"cover"}}/></td>
                            <td> {(book.status === true  && book.stock > 0)? "Visible to user" : "Not visible "}</td>
                            <td> 
                                <NavLink to={"/updatebook/" + book._id}>
                                <button className="btn btn-primary" key={book._id + "edit"}><i className="bi bi-pencil-square"></i></button>&nbsp;
                                </NavLink>
                                
                                <button className="btn btn-secondary" key={book._id + "editImage"}  onClick={() => this.handleImageModal(book._id, book.bookName)}> <i className="bi bi-card-image"></i></button>&nbsp;
                                
                                <button className="btn btn-danger" key={book._id + "delete"} onClick={() => this.handleDeleteModal(book._id,book.bookName)}>&nbsp;<i className="bi bi-archive-fill"></i></button>
                            </td>

                        </tr>
                        )
                    })}
                </tbody>
            </table>
        )


    }
    
    render() {
        return (
            <React.Fragment>    
            <div className="alert alert-success text-center">
               <h4>Books added by me</h4> 
            </div>
             
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
                        <Alert title="No books are added by you" />}
                    
                    
                        {this.state.books.length > 0 && this.renderTable()}
                        <ModalCustom accept={this.onClickDelete}
                            title="Delete Book"
                            body={"Do you want to delete book named " + this.state.bookname + "?"}
                            show={this.state.isDeleteOpen} 
                            rejectTitle = "Cancel"
                            acceptTitle="Delete"


                            reject={this.closeDeleteModal}
                           close={this.closeDeleteModal}
                           />

                        <ModalImageForm
                            show={this.state.isImageOpen}
                            title={"Change '" + this.state.bookname + " ' Image"}
                            label="Image"
                            name="image"
                            onChange={this.onChangeFileHandler}
                            error={this.state.errors.image}
                            accept={this.doSubmitImage}
                            reject={this.closeImageModal}
                            close={this.closeImageModal}
                        />

                           
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default AddedBookTable

