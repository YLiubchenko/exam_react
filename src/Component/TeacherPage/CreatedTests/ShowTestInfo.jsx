import React, {useState} from 'react';
import {randomKeyMap} from "../../js/randomKeyMap";

const ShowTestInfo = ({testDetails}) => {
    const {name} = testDetails;

    const obj = {
        name: 'Name',
        dateFinish: 'Finish test',
        dateStart: 'Start test',
        evaluationMethod: 'Evaluation method',
        passingScore: 'Passing score',
        questionsNumber: 'Number of questions',
        minute: 'Test duration',
        attemptsAllowed: 'Attempts allowed',
        description: 'Description'
    }

    const testInfo = Object.keys(testDetails);

    const AllInfo = () => {
        testDetails.dateFinish = testDetails.dateFinish + ', ' + testDetails.timeFinish;
        testDetails.dateStart = testDetails.dateStart + ', ' + testDetails.timeStart;

        return testInfo.map(type => {
            if (type !== 'name' && type !== 'timeFinish' && type !== 'timeStart') {
                return (
                    <div key={randomKeyMap()}>
                        <b>{obj[type]}:</b> <span>{testDetails[type]}</span>
                    </div>
                )
            }
        })
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>Information about test</h3>
            <AllInfo/>
        </div>
    )
}

export default ShowTestInfo;