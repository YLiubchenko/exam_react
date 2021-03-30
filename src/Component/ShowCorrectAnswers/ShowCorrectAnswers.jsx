import React from 'react';
import {CreateExamData} from "../MainPage/CreateExamData";

export function ShowCorrectAnswers({questionsExam, isFinish, colorClasses, completeReview}) {

    const AllAnswers = () => {
        return questionsExam.map((item, index) => {
            return <CreateExamData key={Math.floor(Math.random() * 10000)} step={index} isFinish={isFinish}
                                   item={item} colorClasses={colorClasses}/>
        })
    }

    return (
        <div>
            <AllAnswers/>
            <button onClick={completeReview} name={'completeReview'}>Complete the review</button>
        </div>
    )
}