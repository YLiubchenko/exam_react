import React from 'react';
import {ExamQuestionPage} from "../ExamQuestionPage/ExamQuestionPage";
import {MovementOnQuestion} from "./MovementOnQuestion";

export function CreateExamData({questionsExam, isFinish, step, setStep, item, finishExam, colorClasses}) {

    return (
        <div className={'quest'}>
            <div>
                <h5>Question {step + 1}</h5>
            </div>
            <ExamQuestionPage step={step} examQuestions={item || questionsExam[step]} isFinish={isFinish}
                              colorClasses={colorClasses}/>

            {
                isFinish ||
                <MovementOnQuestion setStep={setStep} step={step} dataLength={item || questionsExam.length}
                                    finishExam={finishExam}/>
            }
        </div>
    )
}

