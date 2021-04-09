import React, {useState} from "react";

import {DropFormRedux} from "./Drop/DropForm";
import DropSide from "./Drop/DropSide";
import {useSelector} from "react-redux";

const Drop = ({name, studentInTest}) => {

    const [chosenStudents, setChosenStudents] = useState([]);
    const [studentsRight, setStudentsRight] = useState([]);
    const [studentsLeft, setStudentsLeft] = useState([]);
    const userId = useSelector(state => state.singIn.userId);
    const [val, setVal] = useState('');

    const submit = async (values) => {
        const {course, faculty} = values;
        const fetchUrl = await fetch(`http://localhost:3333/created-tests/${name}/${faculty}/${course}`);
        const result = await fetchUrl.json();
        const res = result.students.map(email => email.email);
        setVal(values);
        setStudentsLeft(res);
    }

    const clickOnStudent = (e) => {
        let {className, innerText} = e.target;
        let arr = chosenStudents;

        if (className === 'drop-item') {
            e.target.className += ' drop-active';
            arr.push(innerText);
        } else {
            e.target.className = 'drop-item';
            arr.splice(arr.indexOf(innerText), 1);
        }

        setChosenStudents(arr);
    }

    const clickArrowRight = () => {
        let arrRight = [...studentsRight];

        chosenStudents.forEach(chosen => {
            let index = studentsLeft.indexOf(chosen);
            if (index !== -1) {
                arrRight.push(...studentsLeft.splice(index, 1));
            }
        });

        setStudentsRight([...arrRight]);
        setChosenStudents([]);
    }

    const clickArrowLeft = () => {
        let arrLeft = [...studentsLeft];

        chosenStudents.forEach(chosen => {
            let index = studentsRight.indexOf(chosen);
            if (index !== -1) {
                arrLeft.push(...studentsRight.splice(index, 1));
            }
        });

        setStudentsLeft([...arrLeft]);
        setChosenStudents([]);
    }

    const addStudentsInTest = async () => {

        const {faculty, course} = val;
        let obj = studentInTest[name] || {};
        obj[faculty] = obj[faculty] || {};
        obj[faculty][course] = studentsRight;

        const res = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({[name]: obj})
        };

        let fetchUrl = await fetch(`http://localhost:3333/created-tests/${name}/${userId}`, res);
        return await fetchUrl.json();
    }

    return (
        <div>
            <DropFormRedux onSubmit={submit}/>

            <div className='drop-main'>
                <DropSide students={studentsLeft} clickOnStudent={clickOnStudent}/>
                <div>
                    <button onClick={clickArrowRight} disabled={!studentsLeft.length}>+</button>
                    <button onClick={clickArrowLeft} disabled={!studentsRight.length}>-</button>
                </div>
                <DropSide students={studentsRight} clickOnStudent={clickOnStudent}/>
            </div>
            <button onClick={addStudentsInTest}>Save</button>
        </div>
    )
}

export default Drop;