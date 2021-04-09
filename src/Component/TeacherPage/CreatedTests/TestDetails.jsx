import React, {useState} from 'react';

import ShowTestInfo from "./ShowTestInfo";
import ShowStudents from "./ShowStudents";
import {useSelector} from "react-redux";
import Drop from "./Drop";

const TestDetails = ({testDetails, addedStudents, setAddedStudents}) => {
    const [isAddUsers, setIsAddUsers] = useState(false);
    const [isShowTestInfo, setIsShowTestInfo] = useState(false);
    const [isShowStudentsInTest, setIsShowStudentsInTest] = useState(false);
    const userId = useSelector(state => state.singIn.userId);
    const [studentInTest, setStudentInTest] = useState(addedStudents);


    const showTestInfo = () => {
        setIsShowTestInfo(!isShowTestInfo);
        setIsAddUsers(false);
        setIsShowStudentsInTest(false);
    }

    const clickOnAddStudents = async () => {
        setIsAddUsers(!isAddUsers);
        setIsShowTestInfo(false);
        setIsShowStudentsInTest(false);

        let fetchUrl = await fetch(`http://localhost:3333/created-tests/${testDetails.name}/${userId}`);
        let dataJSON = await fetchUrl.json();
        setStudentInTest(JSON.parse(dataJSON.students) || {});
    }

    const showStudents = async () => {
        setIsShowStudentsInTest(!isShowStudentsInTest);
        setIsAddUsers(false);
        setIsShowTestInfo(false);

        let fetchUrl = await fetch(`http://localhost:3333/created-tests/${testDetails.name}/${userId}`);
        let dataJSON = await fetchUrl.json();
        setAddedStudents(JSON.parse(dataJSON.students) || {});
    }

    return (
        <div>
            <div>
                {isShowTestInfo
                    ? <ShowTestInfo testDetails={testDetails}/>
                    : <button onClick={showTestInfo}>Show details about test</button>
                }
            </div>

            <div>
                {isAddUsers
                    ? <Drop name={testDetails.name} studentInTest={studentInTest}/>
                    : <button onClick={clickOnAddStudents}>Add students</button>
                }
            </div>

            <div>
                {isShowStudentsInTest
                    ? <ShowStudents addedStudents={addedStudents[testDetails.name]}/>
                    : <button onClick={showStudents}>Show students present in the test</button>
                }
            </div>
        </div>
    )
}

export default TestDetails;