import React, {useState} from "react";
import {Link} from "react-router-dom";
import CreatedTests from "./CreatedTests/CreatedTests";
import {CreateTest} from "./CreateTest/CreateTest";
import {useSelector} from "react-redux";

export function TeacherPage({setTeacherTest, teacherTest}) {
    const [isCreateTest, setIsCreateTest] = useState(false);
    const [isShowCreatedTests, setIsShowCreatedTests] = useState(false);
    const [addedStudents, setAddedStudents] = useState({});
    let userId = useSelector(state => state.singIn.userId);

    const createTest = () => {
        setIsCreateTest(!isCreateTest);
        setIsShowCreatedTests(false);
    }

    const showCreatedTests = async () => {
        setIsShowCreatedTests(!isShowCreatedTests);
        setIsCreateTest(false);
        let fetchUrl = await fetch('http://localhost:3333/created-tests/' + userId);
        let dataJSON = await fetchUrl.json();
        setTeacherTest(JSON.parse(dataJSON.tests));
    }

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={`/teacher-page/create-test`} onClick={createTest}>Add new test</Link>
                    </li>
                    <li>
                        <Link to={`/teacher-page/created-tests`} onClick={showCreatedTests}>
                            Created tests</Link>
                    </li>
                </ul>
            </nav>

            {
                isCreateTest &&
                <CreateTest setTeacherTest={setTeacherTest} teacherTest={teacherTest} isCreateTest={isCreateTest}
                            setIsCreateTest={setIsCreateTest}/>
            }


            {
                isShowCreatedTests &&
                <CreatedTests teacherTest={teacherTest} addedStudents={addedStudents}
                              setAddedStudents={setAddedStudents}/>
            }
        </div>
    )

}