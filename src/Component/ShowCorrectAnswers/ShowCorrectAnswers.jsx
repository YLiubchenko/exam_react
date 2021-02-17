import React from 'react';
import {CreateExamData} from "../MainPage/CreateExamData";

export function ShowCorrectAnswers({questionsExam, isFinish, score, setScore}) {

    const AllAnswers = () => {
        return questionsExam.map((item, index) => {
            return <CreateExamData key={Math.floor(Math.random() * 10000)} step={index} isFinish={isFinish} item={item}
                                   score={score} setScore={setScore}/>
        })
    }

    return (
        <div>
            <AllAnswers/>
        </div>
    )
}