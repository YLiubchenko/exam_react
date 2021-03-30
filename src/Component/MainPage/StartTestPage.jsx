import React, {useEffect, useState} from "react";
import {convertDate} from "../js/convertDate";

export function StartTestPage({startExam, teacherData, isStart, limitTime, date, scoresAll}) {
    let {dateStart, dateFinish, timeStart, timeFinish, name, attemptsAllowed, evaluationMethod} = teacherData;
    let currentDate = date;
    let startDate = new Date(`${dateStart}T${timeStart}`);
    let finishDate = new Date(`${dateFinish}T${timeFinish}`);
    let availableTest = currentDate >= startDate && currentDate < finishDate;
    let attempts = 'notLimit';
    const [isAvailableTest, setIsAvailableTest] = useState(availableTest);


    useEffect(() => {
        let intervalId = setInterval(() => {
            currentDate = new Date();

            if (currentDate >= startDate && currentDate <= finishDate) {
                setIsAvailableTest(true);
            } else {
                setIsAvailableTest(false);
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isStart]);

    if (Number(attemptsAllowed)) {
        let testName = scoresAll.test && scoresAll.test[teacherData.name];
        const att = testName && Object.keys(scoresAll).length ? Object.keys(testName).length : 0;
        attempts = attemptsAllowed > att;
    }

    return (
        <div>
            <h2>{name}</h2>
            {attemptsAllowed !== 'notLimited' && attemptsAllowed ? <p>Attempts allowed: {attemptsAllowed}</p> : ''}
            <p>Time limit: {limitTime}</p>
            {
                isAvailableTest ||
                <p>The test will not be available until: {convertDate(startDate)}, {timeStart}</p>
            }
            <p>The test will be closed: {convertDate(finishDate)}, {timeFinish}</p>
            <p>Evaluation method: {evaluationMethod}</p>

            {isAvailableTest && attempts && <button onClick={startExam}>Start exam</button>}
            {attempts ? '' : <div><strong>You have already used all attempts.</strong></div>}
        </div>
    )
}