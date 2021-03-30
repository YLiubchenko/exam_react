import React from 'react';
import {TypeAnswer} from "../typesQuestion/TypeAnswer";

export function ExamQuestionPage({examQuestions, step, isFinish, colorClasses}) {
    return (
        <div>
            {examQuestions.question}

            <TypeAnswer item={examQuestions} isFinish={isFinish} colorClasses={colorClasses} step={step}/>

        </div>
    )
}