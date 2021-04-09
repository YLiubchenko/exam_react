import React from "react";

import CreateTestRedux from "./CreateTestRedux";
import {useSelector} from "react-redux";

export function CreateTest({setTeacherTest, teacherTest, setIsCreateTest, isCreateTest}) {
    let mainObj = teacherTest || {};
    let userId = useSelector(state => state.singIn.userId);

    // const handleClick = (e) => {
    //     const {name, value} = e.target;
    //     if (name === 'timeLimit') {
    //         obj[name] = value.split(':');
    //     } else {
    //         obj[name] = value;
    //     }
    // }

    const submit = async (values) => {
        mainObj[values.name] = values;
        setTeacherTest(mainObj);
        setIsCreateTest(!isCreateTest);

        console.log(mainObj);

        const res = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(mainObj)
        };

        const response = await fetch(`http://localhost:3333/create-test/${userId}`, res);
        return await response.json();
    }

    return (
        <div className={'create'}>
            <h2>To create a test, fill in all the necessary information</h2>
            <CreateTestRedux onSubmit={submit}/>
        </div>
    )
}


