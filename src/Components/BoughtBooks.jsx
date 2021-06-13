import React, { Component } from 'react'
import {getMyBooks } from "../services/orderService"
import Alert from "./common/Alert"
class BoughtBooks extends Component{
    state = {
        orders: [],
        message: null,
    }
   
 
    async componentDidMount(){
        const {data} = await getMyBooks()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({orders:data, message})
    }

   
    
      
      

   
    renderTable= () => {
        const columns = ["bookname", "author", "quantity", "price",  "negotiable", "image", "Seller","Contact"]
        return (
            <table className="table  table-striped table-responsive">
                <thead>
                    <tr key="columns">
                        {columns.map(col => <th scope="col" key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.orders.map(order=>{
                        const {seller_id:seller} = order
                        const {book_id:book} = order
                        return(<tr key={order._id}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{order.quantity}</td>
                            <td>{book.price}</td>
                            <td>{book.negotiable === true ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/images/" + book.image}  alt="" width="200px" height="200px"  style={{objectFit:"cover"}}/></td>
                            <td>{seller.firstname + " " + seller.lastname}</td>
                            <td>{seller.contact}</td>
            
                          
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
               <h4>Bought books </h4> 
            </div>
             
            {this.state.orders.length === 0 && !this.state.message && (
                        <div
                            className="text-center"
                            style={{ marginTop: "150px", height: "90vh" }}
                        >
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                    {this.state.orders.length === 0 &&
                        this.state.message &&
                        <Alert title="No books bought" />}
                    
                    
                        {this.state.orders.length > 0 && this.renderTable()}
                      
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default BoughtBooks

