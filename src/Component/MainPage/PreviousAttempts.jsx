import React from 'react';
import {randomKeyMap} from "../js/randomKeyMap";
import evaluateMethod from "./evaluationMethod";

export function PreviousAttempts({scoresAll, teacherData}) {
    let {scores, result, fullDates} = evaluateMethod(scoresAll, teacherData);

    const ScoresTable = () => {
        return scores.map((score, i) => {
            return (
                <div className={'attempts attempts-result'} key={randomKeyMap()}>
                    <div>{i + 1}</div>
                    <div>{fullDates[i]}</div>
                    <div>{score}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <h4>Just from your previous attempts</h4>
            <div className={'attempts'}>
                <div>Attempt</div>
                <div>Status</div>
                <div>Score</div>
            </div>

            <ScoresTable/>

            <div>{teacherData.evaluationMethod}: {result}/30</div>
        </div>
    )
}