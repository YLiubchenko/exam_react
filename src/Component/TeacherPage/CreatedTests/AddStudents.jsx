import React from 'react';
import {Field, reduxForm, reset} from "redux-form";
import FieldInput from "../../FormComponents/FieldComponent";
import Select from "../../FormComponents/Select";

const AddStudents = ({handleSubmit}) => {
    const studentData = {
        course: [1, 2, 3, 4, 5, 6],
        faculty: ['ek', 'nat', 'phi']
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name='email' component={FieldInput} required={true} type="email" label='Email'/>
            </div>
            <Select options={studentData.course} name='course' label='Course'/>
            <Select options={studentData.faculty} name='faculty' label='Faculty'/>
            <button>Add</button>
        </form>
    )

}

const afterSubmit = (result, dispatch) => {
    return dispatch(reset('addStudent'));
}

const AddStudentsRedux = reduxForm({
    form: 'addStudent',
    onSubmitSuccess: afterSubmit,
})(AddStudents);

export default AddStudentsRedux;