import React, {useState} from 'react';

import TestDetails from "./TestDetails";
import CreateLink from "./CreateTestLink";

const AllTests = ({teacherTest, addedStudents, setAddedStudents}) => {
    const testsName = Object.keys(teacherTest);
    const [isClick, setIsClick] = useState(false);
    const [testName, setTestName] = useState('');

    const clickOnTest = (e) => {
        setIsClick(true);
        setTestName(e.target.name)
    }

    return (
        <div>
            <nav>
                <ul>
                    <CreateLink click={clickOnTest} link='teacher-page/created-tests' testsName={testsName}/>
                </ul>
            </nav>

            {
                isClick &&
                <TestDetails testDetails={teacherTest[testName]} addedStudents={addedStudents}
                             setAddedStudents={setAddedStudents}/>
            }
        </div>
    )
}

export default AllTests;