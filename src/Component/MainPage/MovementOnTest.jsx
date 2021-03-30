import React from 'react';
import {CountQuestions} from "../CountQuestions/CountQuestions";
import {Score} from "./Score";

export function MovementOnTest(props) {
    let {
        questionsExam,
        finishExam,
        step,
        setStep,
        testDuration,
        scoreArr,
        notPass,
        scores,
        isFinish,
        setIsFinish
    } = props;

    return (
        <div className={'aside'}>
            <div className={'countContainer'}>
                <CountQuestions finishExam={finishExam} questionsExam={questionsExam} setStep={setStep}
                                step={step} testDuration={testDuration} setIsFinish={setIsFinish}
                                isFinish={isFinish} scoreArr={scoreArr}/>
                {isFinish &&
                <div>
                    {notPass || ''}
                    <div>Score: <Score scoreResult={scores}/>/{questionsExam.length}</div>
                </div>
                }
            </div>
        </div>

    )
}