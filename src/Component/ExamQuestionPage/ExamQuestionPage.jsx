import React from 'react';
import {TypeAnswer} from "../typesQuestion/TypeAnswer";
import {Movement} from "../MainPage/Movement";

export function ExamQuestionPage({examQuestions, step, isFinish, setStep, length, finishExam, score, setScore}) {

    return (
        <div>
            {examQuestions.question}

            <TypeAnswer item={examQuestions} isFinish={isFinish} score={score} setScore={setScore}/>

            {
                isFinish ||
                <Movement setStep={setStep} step={step} dataLength={length} finishExam={finishExam}/>
            }

        </div>
    )
}