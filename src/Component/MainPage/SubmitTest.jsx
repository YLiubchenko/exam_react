import React from 'react';
import {randomKeyMap} from "../js/randomKeyMap";


export function SubmitTest({questionsExam}) {
    const TableOrAnswer = () => {
        return questionsExam.map((el, i) => {
            let answer = el.enteredAnswer.length ? 'Answer saved' : 'No answer yet';
            return (
                <div className='submitTable' key={randomKeyMap()}>
                    <div className='numberQuestion submitCell'>{i + 1}</div>
                    <div className='answerTable submitCell'>{answer}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className='submitTable'>
                <div className='answerTable submitCell'><strong>Question</strong></div>
                <div className='answerTable submitCell'><strong>Status</strong></div>
            </div>
            <TableOrAnswer/>
        </div>
    )
}