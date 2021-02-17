import React from 'react';
import {ExamQuestionPage} from "../ExamQuestionPage/ExamQuestionPage";

export function CreateExamData({questionsExam, isFinish, step, setStep, item, finishExam, score, setScore}) {

    return (
        <div className={'quest'}>
            <div>
                <h5>Question {step + 1}</h5>
            </div>
            <ExamQuestionPage step={step} examQuestions={item || questionsExam[step]} isFinish={isFinish} score={score}
                              setStep={setStep} length={item || questionsExam.length} finishExam={finishExam}
                              setScore={setScore}/>
        </div>
    )
}

