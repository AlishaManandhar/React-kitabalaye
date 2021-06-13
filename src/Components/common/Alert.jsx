import React from "react";

const Alert = (props) => {
    
    return (
        
           
        <div className="col-12 col-md-6 col-lg-5 offset-md-3 offset-lg-4 "  style={{padding: "50px", marginTop: "50px"}}>
        <div className="alert alert-danger text-center py-5" role="alert"  >
            <h4>{props.title}</h4>
        </div>
    </div>
    );

};

export default Alert;