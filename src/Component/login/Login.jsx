import React from "react";
import {Field, reduxForm} from "redux-form";
import FieldInput from "../FormComponents/FieldComponent";

const LoginForm = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='email' component={FieldInput} required={true} type="email" label='Email'/>
            </div>
            <div>
                <Field name='password' component={FieldInput} required={true} type="password" label='Password'/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
};

const LoginFormRedux = reduxForm({form: 'login'})(LoginForm);

export default LoginFormRedux;


