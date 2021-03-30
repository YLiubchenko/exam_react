import React from "react";
import {typeOfOrObj} from "./MainPage/typeOfOrObj";

function ResultPage({resultsTest, teacherTest}) {
    let result = 0;
    let allTests = Object.keys(teacherTest);
    resultsTest = typeOfOrObj(resultsTest) || {};

    const AllTests = () => {
        return allTests.map((el) => {
            let score = resultsTest[el] || 0;
            result += score;

            return (
                <div key={Date.now + Math.random()} className={'testResult'}>
                    <div>{el}</div>
                    <div>{score}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className={'testResult'}>
                <div><b>Test name</b></div>
                <div><b>Scores</b></div>
            </div>

            {AllTests()}

            <div className={'testResult'}>
                <div><b>Total score:</b></div>
                <div><b>{result}</b></div>
            </div>
        </div>
    )
}

export default ResultPage;