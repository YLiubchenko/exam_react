import Select from "../../../FormComponents/Select";
import {reduxForm} from "redux-form";
import React from "react";

const DropForm = ({handleSubmit}) => {
    const studentData = {
        course: [1, 2, 3, 4, 5, 6],
        faculty: ['ek', 'nat', 'phi']
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select options={studentData.course} name='course' label='Course'/>
            <Select options={studentData.faculty} name='faculty' label='Faculty'/>
            <button>Find</button>
        </form>
    )

}

export const DropFormRedux = reduxForm({
    form: 'addStudent',
})(DropForm);