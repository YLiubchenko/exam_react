import React, {useState} from 'react';
import {randomQuestions} from "../js/randomQuestionts";
import {TestDataPage} from "./TestDataPage";
import {TestPage} from "./TestPage";
import {randomKeyMap} from "../js/randomKeyMap";
import {useSelector} from "react-redux";
import evaluateMethod from "./evaluationMethod";

export function MainPage({questions, teacherData, date, data, scoresAll}) {
    const [questionsExam, setQuestionsExam] = useState(questions);
    const [isStart, setIsStart] = useState(true);
    let [testId, setTestId] = useState('');
    let userId = useSelector(state => state.singIn.userId);

    let {hour, minute} = teacherData;
    const testDuration = {hours: +hour || 0, minutes: +minute || 0, seconds: 0};

    const startExam = () => {
        setTestId(randomKeyMap());
        setIsStart(!isStart);
    }

    const completeReview = async () => {
        let arr = randomQuestions(data, teacherData.questionsNumber);
        setQuestionsExam(arr);
        setIsStart(!isStart);
        evaluateMethod(scoresAll, teacherData)

        const res = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(scoresAll)
        };

        const response = await fetch(`http://localhost:3000/tests-pages/${userId}`, res);
        return await response.json();
    }

    return (
        <div>
            {isStart
                ? <TestDataPage teacherData={teacherData} testDuration={testDuration} testId={testId}
                                date={date} isStart={isStart} startExam={startExam}
                                scoresAll={scoresAll}/>
                : <TestPage questionsExam={questionsExam} teacherData={teacherData}
                            startExam={startExam} testDuration={testDuration} scoresAll={scoresAll}
                            completeReview={completeReview} testId={testId}/>
            }
        </div>
    )
}