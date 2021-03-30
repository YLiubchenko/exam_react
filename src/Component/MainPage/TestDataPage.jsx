import React from 'react';
import {StartTestPage} from "./StartTestPage";
import {PreviousAttempts} from "./PreviousAttempts";

export function TestDataPage({teacherData, date, testDuration, isStart, startExam, scoresAll}) {
    let limitTime = '';

    for (let key in testDuration) {
        if (testDuration[key]) {
            limitTime += `${testDuration[key]} ${testDuration[key] > 1 ? key : key.slice(0, -1)} `;
        }
    }

    let tests = scoresAll.test;
    let testName = tests && tests[teacherData.name]
    const att = tests && testName && Object.keys(testName).length ? Object.keys(testName).length : 0;

    return (
        <div className={'startPage'}>
            <StartTestPage startExam={startExam} isStart={isStart} teacherData={teacherData}
                           limitTime={limitTime} date={date} scoresAll={scoresAll}/>
            {att ?
                <PreviousAttempts teacherData={teacherData} scoresAll={scoresAll}/> : ''}
        </div>
    )
}