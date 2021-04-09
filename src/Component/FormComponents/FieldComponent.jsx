import React from "react";

export const FieldInput = ({type, label, name, input, required = false, meta: {touched, error, warning}}) => {

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input} type={type} name={name} required={required} className={touched && error ? "danger" : ''}/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning &&
                <span>{warning}</span>))}

        </div>
    )
}

export default FieldInput;