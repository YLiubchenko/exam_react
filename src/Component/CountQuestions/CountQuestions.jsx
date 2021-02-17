import React from 'react';
import s from './CountQuestion.module.css';
import classNames from 'classnames';
import TimeTest from "./TimeTest";


export function CountQuestions({finishExam, questionsExam, setStep, step, setIsFinish, isFinish, testDuration}) {
    const startTime = Date.now();

    const Count = () => {
        return questionsExam.map((el, index) => {
            let orActive = step === index;
            return (
                <button key={Math.floor(Math.random() * 10000)}
                        className={classNames(s.countBtn, {[s.active]: orActive})}
                        onClick={(e) => setStep(index)}>{index + 1}</button>
            )
        });
    }

    return (
        <div>
            <Count/>
            {!isFinish &&
            <div>
                <TimeTest testDuration={testDuration} startTime={startTime} setIsFinish={setIsFinish}/>
                <button onClick={finishExam}>Finish testing</button>
            </div>
            }
        </div>
    )
}