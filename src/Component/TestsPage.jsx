import React, {useState} from "react";
import {useSelector} from "react-redux";

import Moodle from "./Moodle";
import CreateLink from "./TeacherPage/CreatedTests/CreateTestLink";

function TestsPage({teacherTest, date, scoresAll, setScoresAll, setDate}) {
    let userId = useSelector(state => state.singIn.userId);
    let tests = Object.keys(teacherTest);
    let [isClick, setIsClick] = useState(false);
    let [testName, setTestName] = useState('');
    let [teacherData, setTeacherData] = useState({});

    const clickTestPage = async (e) => {
        let nam = e.target.name;
        setTestName(nam);
        setTeacherData(teacherTest[nam]);
        setDate(new Date());

        const fetchUrl = await fetch('http://localhost:3333/tests-page/' + userId);
        const dataJSON = await fetchUrl.json();

        const scoresAll = dataJSON || {};
        scoresAll.test = !scoresAll.test ? {} : JSON.parse(scoresAll.test);
        setScoresAll(scoresAll);
        setIsClick(true);
    }

    return (
        <div>
            <nav>
                <ul>
                    <CreateLink testsName={tests} click={clickTestPage} link='tests-page'/>
                </ul>
            </nav>

            {isClick &&
            <Moodle teacherData={teacherData} date={date} scoresAll={scoresAll} testName={testName}/>
            }
        </div>
    );
}

export default TestsPage;