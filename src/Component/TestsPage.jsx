import React, {useState} from "react";
import Moodle from "./Moodle";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

function TestsPage({teacherTest, date, scoresAll, setScoresAll, setDate}) {
    let userId = useSelector(state => state.singIn.userId);
    let tests = Object.keys(teacherTest);
    let [isClick, setIsClick] = useState(false);
    let [testName, setTestName] = useState('');
    let [teacherData, setTeacherData] = useState({});

    console.log(teacherTest)


    const clickTestPage = async (e) => {
        let nam = e.target.name;
        setTestName(nam);
        console.log(teacherTest)
        setTeacherData(teacherTest[nam]);
        setDate(new Date());

        const fetchUrl = await fetch('http://localhost:3333/tests-page/' + userId);
        const dataJSON = await fetchUrl.json();

        const scoresAll = dataJSON || {};
        scoresAll.test = !scoresAll.test ? {} : JSON.parse(scoresAll.test);
        setScoresAll(scoresAll);
        setIsClick(true);
    }

    console.log(teacherData);

    const ShowTests = () => {
        return tests.map(testName => {
            let key = Date.now() + Math.random() * 10;
            return (
                <li key={key}>
                    <Link to={`/tests-page/${key}`} onClick={clickTestPage} name={testName}>{testName}</Link>
                </li>
            )
        })
    }

    return (
        <div>
            <nav>
                <ul>
                    {ShowTests()}
                </ul>
            </nav>

            {isClick &&
            <Moodle teacherData={teacherData} date={date} scoresAll={scoresAll} testName={testName}/>
            }
        </div>
    );
}

export default TestsPage;