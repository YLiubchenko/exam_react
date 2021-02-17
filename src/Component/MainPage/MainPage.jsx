import React, {useState} from 'react';
import {CreateExamData} from "./CreateExamData";
import {CountQuestions} from "../CountQuestions/CountQuestions";
import {ShowCorrectAnswers} from "../ShowCorrectAnswers/ShowCorrectAnswers";

export function MainPage({questionsExam}) {
    const [isFinish, setIsFinish] = useState(false);
    const [start, setStart] = useState(false);
    const [step, setStep] = useState(0);
    let [core, setScore] = useState(0);
let score = 0;
    const finishExam = () => {
        setIsFinish(true);
    }

    const startExam = () => {
        setStart(true);
    }

    const testDuration = {hours: 0, minutes: 1, seconds: 0};
    let limitTime = '';

    for (let key in testDuration) {
        if (testDuration[key]) {
            limitTime += `${testDuration[key]} ${testDuration[key] > 1 ? key : key.slice(0, -1)} `
        }
    }

    return (
        <div>
            {!start
                ? <div>
                    <h2>You can start an exam</h2>
                    <h4>Time limit: {limitTime}</h4>
                    <button onClick={() => startExam()}>Start exam</button>
                </div>
                : <div>
                    <aside className={'aside'}>
                        <div className={'countContainer'}>
                            <CountQuestions finishExam={finishExam} questionsExam={questionsExam} setStep={setStep}
                                            step={step} testDuration={testDuration} setIsFinish={setIsFinish}
                                            isFinish={isFinish}/>
                            {isFinish &&
                            <div>
                                Score: {score}/{questionsExam.length}
                            </div>
                            }
                        </div>


                    </aside>
                    <div className={'questionContainer'}>
                        <div className={'subject'}>
                            <h2>Subject</h2>
                        </div>


                        {isFinish
                            ? <ShowCorrectAnswers questionsExam={questionsExam} isFinish={isFinish} score={score} setScore={setScore}/>
                            : <CreateExamData questionsExam={questionsExam} isFinish={isFinish} step={step}
                                              setStep={setStep} finishExam={finishExam}/>
                        }
                    </div>
                </div>
            }
        </div>
    )
}