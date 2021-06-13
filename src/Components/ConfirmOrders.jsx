import React, { Component } from 'react'
import {getConfirmList,confirmSold } from "../services/orderService"
import ModalCustom from "./common/ModalCustom"
import Alert from "./common/Alert"
class ConfirmOrders extends Component{
    state = {
        orders: [],
        message: null,
        isOpen: false,
        id: null,
        bookname:null,
        
    }
    openModal = (id,bookname) => this.setState({ isOpen: true,id,bookname});
    closeModal = () => this.setState({ isOpen: false });
    
    onClickReject = async() => {
        this.closeModal()
        await confirmSold({status: 'rejected'},this.state.id)
        this.setState({
            message:null,
            id:null,
            orders:[],
            bookname:null
        })
    }
    onClickSold = async() => {
        this.closeModal()
        await confirmSold({status: 'sold'},this.state.id)
        this.setState({
            message:null,
            id:null,
            orders:[],
            bookname:null
        })
    }
    async componentDidMount(){
        const {data} = await getConfirmList()
        let message = null
        if (data.length === 0)
        {
            message = true
        }
        this.setState({orders:data, message})
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.orders.length !== this.state.orders.length) {
            const {data} = await getConfirmList()
            let message = null
            if (data.length === 0)
            {
                message = true
            }
            this.setState({orders:data, message})
        }
      }
    
      
      

   
    renderTable= () => {
        const columns = ["bookname", "author", "quantity", "price",  "negotiable", "image", "Buyer","Contact","Actions"]
        return (
            <table className="table  table-striped table-responsive">
                <thead>
                    <tr key="columns">
                        {columns.map(col => <th scope="col" key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.state.orders.map(order=>{
                        const {buyer_id:buyer} = order
                        const {book_id:book} = order
                        return(<tr key={order._id}>
                            <td>{book.bookName}</td>
                            <td>{book.author}</td>
                            <td>{order.quantity}</td>
                            <td>{book.price}</td>
                            <td>{book.negotiable === true ? "yes" : "no"}</td>
                            <td><img src={"http://localhost:8000/images/" + book.image} alt="" width="200px" height="200px"  style={{objectFit:"cover"}}/></td>
                            <td>{buyer.firstname + " " + buyer.lastname}</td>
                            <td>{buyer.contact}</td>
            
                            <td> 
                            
                                <button className="btn btn-danger" key={order._id + "respond"} onClick={()=>this.openModal(order._id,book.bookName)}>Confirm</button> </td>

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
               <h4>Orders to be confirmed</h4> 
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
                        <Alert title="No orders for confirming" />}
                    
                    
                        {this.state.orders.length > 0 && this.renderTable()}
                        <ModalCustom accept={this.onClickSold}
                            title="Confirm Order"
                            body={"Do you want to confirm '" + this.state.bookname + "' as sold ?"}
                            show={this.state.isOpen} 
                           reject={this.onClickReject}
                           close={this.closeModal}
                           rejectTitle="Reject"
                           acceptTitle="Confirm Sold"
    
                           />
                            

                   
               
               
        </React.Fragment>
        )
                    }


}

export default ConfirmOrders

