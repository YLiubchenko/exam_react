import React from 'react';

import AllTests from "./AllTests";

const CreatedTests = ({teacherTest, addedStudents, setAddedStudents}) => {
    const isHaveCreatedTest = teacherTest ? !!Object.keys(teacherTest).length : false;

    return (
        <div>
            {isHaveCreatedTest
                ?
                <AllTests teacherTest={teacherTest} addedStudents={addedStudents} setAddedStudents={setAddedStudents}/>

                : <div>
                    You don't have the created tests yet. Click 'Add new test'.
                </div>
            }
        </div>
    )
}

export default CreatedTests;