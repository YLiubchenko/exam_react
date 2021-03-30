import React from "react";
import {Field, reduxForm} from "redux-form";

const LoginForm = ({handleSubmit}) => {

    const requiredField = ({type, label, name, input, meta: {touch, error}}) => {
        return (
            <div>
                <label htmlFor={name}>{label}</label>
                <input {...input} type={type} name={name} required/>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='email' component={requiredField} type="email" label='Email'/>
            </div>
            <div>
                <Field name='password' component={requiredField} type="password" label='Password'/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
};

const LoginFormRedux = reduxForm({form: 'login'})(LoginForm);

export default LoginFormRedux;


