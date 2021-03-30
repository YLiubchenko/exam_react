import './../App.css';
import React, {useEffect, useState} from 'react';
import {MainPage} from "./MainPage/MainPage";
import {randomQuestions} from "./js/randomQuestionts";

function Moodle({teacherData, date, scoresAll, testName}) {
    let questions;
    let [data, setData] = useState(null);

    console.log(teacherData.questionsNumber);

    teacherData = {
        dateFinish: "2021-04-29",
        dateStart: "2021-03-10",
        evaluationMethod: "bestScore",
        passingScore: "1",
        questionsNumber: teacherData.questionsNumber,
        timeFinish: "10:08",
        timeStart: "10:08",
        minute: 45,
        attemptsAllowed: '3',
        name: testName
    }


    useEffect(() => {
        const getData = async () => {
            let fetchUrl = await fetch('/api.json');
            let dataJSON = await fetchUrl.json();
            setData(dataJSON);
        }

        getData();

    }, []);

    if (data) {
        console.log(teacherData.questionsNumber)
        questions = randomQuestions(data, teacherData.questionsNumber);
    }

    return (
        <div className={'App'}>
            {data &&
            <div className={'main'}>
                <MainPage questions={questions} teacherData={teacherData} date={date} data={data}
                          scoresAll={scoresAll}/>
            </div>
            }
        </div>
    );
}

export default Moodle;
