import React, { Component } from 'react'
import { getRequestedOrder, cancelOrder} from "../services/orderService"
import ModalCustom from "./common/ModalCustom"
import Alert from "./common/Alert"


class RequestedOrdersTable extends Component{
    state = {
        orders: [],
        message: null,
        isOpen: false,
        id: null,
        bookname:null
    }
    openModal = (id,bookname) => this.setState({ isOpen: true,id,bookname});
    closeModal = () => this.setState({ isOpen: false });
    
    onClickCancel = async() => {
        this.closeModal()
        await cancelOrder(this.state.id)
        this.setState({
            message:null,
            id:null,
            orders:[],
            ordername:null
        })
    }
    async componentDidMount(){
        const {data} = await getRequestedOrder()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({orders:data, message})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.orders.length !== this.state.orders.length) {
            const {data} = await getRequestedOrder()
            let message = null
            if (data.length === 0)
            {
                message = true
            }
            this.setState({orders:data, message})
        }
      }
    
      
      

    
    
    renderTable= () => {
        const columns = ["Bookname", "author", "quantity", "price",  "negotiable", "image", "Seller","Contact","Status","Actions"]
        return (
            <table className="table  table-striped table-responsive">
                <thead>
                    <tr key="columns">
                        {columns.map(col => <th scope="col" key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.orders.map(order=>{
                        const {book_id:book} = order
                        const {seller_id:seller} = order
                        return(<tr key={order._id}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{order.quantity}</td>
                            <td>{book.price}</td>
                            <td>{book.negotiable === true ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/images/" + book.image} alt=""  width="200px" height="200px"  style={{objectFit:"cover"}}/></td>
                            <td>{seller.firstname + " " + seller.lastname}</td>
                            <td>{seller.contact}</td>
                            <td>{order.status}</td>
                            <td> 
                            {(order.status ==="cancelled" || order.status==="sold" ) ? "":
                                <button className="btn btn-danger" key={order._id + "cancel"} onClick={()=>this.openModal(order._id,book.bookName)}> Cancel Order</button>}
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
               <h4> My Orders </h4> 
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
                        <Alert title="You have not requested any books"  />}
                    
                    
                        {this.state.orders.length > 0 && this.renderTable()}
                        <ModalCustom accept={this.onClickCancel}
                            title="Cancel Order"
                            body={"Do you want to cancel order '" + this.state.bookname + "'  ?"}
                            show={this.state.isOpen} 
                            reject={this.closeModal}
                            close={this.closeModal}
                            rejectTitle="Close"
                            acceptTitle="Save Changes"
                           
                           />
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default RequestedOrdersTable

