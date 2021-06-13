import React, { Component } from "react";
import NavBar from "./NavBar";

import  AddedBooksTable from "./AddedBookTable"
import RequestedOrdersTable from "./RequestedOrdersTable"
import RespondedOrders from "./RespondedOrders"
import BoughtBooks from "./BoughtBooks"
import ConfirmOrders from "./ConfirmOrders"


class History extends Component {

    state = {
        books: [],
        selectedButton: null,
    };

   

    handleRequestedOrder = () => {  this.setState({ selectedButton: "requested-books" }); }
    handleBoughtOrder = () => {  this.setState({ selectedButton: "bought-books" }); }


    handleAddedBooks = () => {  this.setState({ selectedButton: "added-books" }); }
    
    handleRespondedOrders = () => {  this.setState({ selectedButton: "responded-books" }); }

    handleComfirmOrders = () => {  this.setState({ selectedButton: "confirm-books" }); }
    
    


    renderButton = () => {
        return (
            <div className="row py-5" >
                <div className="col-md-3 col-sm-6 mb-3">
                    <button className="btn btn-success btn-lg col-12 py-3" onClick={this.handleBoughtOrder} style={{ opacity: "0.6", borderRadius: "17% 0%" }}>Total Books Bought</button>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <button className="btn btn-success btn-lg col-12 py-3 " onClick={this.handleRequestedOrder} style={{ opacity: "0.6", borderRadius: "17% 0%" }}>Orders_placed</button>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <button className="btn btn-success btn-lg col-12 py-3" onClick={this.handleAddedBooks}  style={{ opacity: "0.6", borderRadius: "17% 0%" }}>Books Added</button>
                </div>
                <div className="col-md-2 col-sm-6 mb-3">
                    <button className="btn btn-success btn-lg col-12 py-3" onClick={this.handleRespondedOrders} style={{ opacity: "0.6", borderRadius: "17% 0%" }}>Order_received</button>
                </div>
                <div className="col-md-3 col-sm-6 mb-3">
                    <button className="btn btn-success btn-lg col-12 py-3" onClick={this.handleComfirmOrders} style={{ opacity: "0.6", borderRadius: "17% 0%" }}>Orders_to_be_confirmed</button>
                </div>

            </div>

        )
    }


    render() {
        return (
            <React.Fragment>
                <NavBar />
                
                <div className="container">
                {this.renderButton()}
                   <div className="container">
                    {this.state.selectedButton === "requested-books" && <RequestedOrdersTable/>}
                    {this.state.selectedButton === "added-books" && <AddedBooksTable />}
                    {this.state.selectedButton === "responded-books" && <RespondedOrders/>}
                    {this.state.selectedButton === "confirm-books" && <ConfirmOrders/>}
                    {this.state.selectedButton === "bought-books" && <BoughtBooks/>}



                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default History;
