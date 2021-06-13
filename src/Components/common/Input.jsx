import React from "react";

const Input = (props) => {
    const { type,error, className,placeholder,...rest } = props;
    return (
        <div className="form-group row mb-3">
            <label htmlFor={placeholder} className="col-form-label col-sm-4 col-form-label">
        {placeholder}:
      </label>
       <div className="col-sm-8">
<input
                type={type}
                id={placeholder}
                className={className}
                {...rest}
                placeholder={placeholder}
            /> 
            {error && <div className="text-danger mt-2 mx-3">{error}</div>}
       </div>
            
           
        </div>
    );

};

export default Input;