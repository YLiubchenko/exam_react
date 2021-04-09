import React from "react";
import {Field, reduxForm} from "redux-form";
import './../../App.css';
import validate from "../FormComponents/validate";
import FieldInput from "../FormComponents/FieldComponent";
import Select from "../FormComponents/Select";

const Registration = ({handleSubmit}) => {

    // const regValue = {
    //     'Email': {
    //         name: 'email', type: "email", required: true
    //     },
    //     'Full name': {
    //         name: 'fullName', type: "text", required: true
    //     },
    //     'Password': {
    //         name: 'password', type: "password", required: true
    //     },
    //     'Confirm password': {
    //         name: 'confirmPassword', type: "password", required: true
    //     },
    //     'Are you a teacher?': {
    //         name: 'isTeacher', type: "checkbox"
    //     }
    // }

    const studentData = {
        course: [1, 2, 3, 4, 5, 6],
        faculty: ['ek', 'nat', 'phi']
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='email' component={FieldInput} required={true} type="email" label='Email'/>
            </div>
            <div>
                <Field name='fullName' component={FieldInput} required={true} type="text" label='Full name'/>
            </div>
            <div>
                <Field name='password' component={FieldInput} required={true} type="password" label='Password'/>
            </div>
            <div>
                <Field name='confirmPassword' component={FieldInput} required={true} type="password"
                       label='Confirm password'/>
            </div>
            <div>
                <Select options={studentData.faculty} name='faculty' label='Faculty'/>
            </div>
            <div>
                <Select options={studentData.course} name='course' label='Course'/>
            </div>
            <div>
                <Field name='isTeacher' component={FieldInput} type="checkbox"
                       label='Are you a teacher?'/>
            </div>
            <button type="submit">Submit</button>
        </form>
    )
};

const RegistrationRedux = reduxForm({form: 'registration', validate})(Registration);

export default RegistrationRedux;


