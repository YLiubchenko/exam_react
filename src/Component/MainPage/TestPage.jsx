import React, {useState, useEffect} from 'react';
import {CreateExamData} from "./CreateExamData";
import {ShowCorrectAnswers} from "../ShowCorrectAnswers/ShowCorrectAnswers";
import {SubmitTest} from "./SubmitTest";
import {MovementOnTest} from "./MovementOnTest";
import checkCorrect from "../js/checkCorrect";
import {convertDate} from "../js/convertDate";

export function TestPage(props) {
    let {questionsExam, startExam, testDuration, teacherData, scoresAll, completeReview, testId} = props;
    const [isFinish, setIsFinish] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [step, setStep] = useState(0);

    let colorClasses = [];
    let scoreArr = [];
    let scores = '';
    let notPass;

    const finishExam = (e) => {
        setIsSubmit(!isSubmit);
        setIsFinish(true);
    }

    const attemptReturn = () => {
        setIsSubmit(!isSubmit);
        setIsFinish(false);
    }

    if (isFinish) {
        questionsExam.forEach((item) => {
            let color = [];
            let score = 0;

            (item.answers || item.answer).forEach(el => {
                let result = checkCorrect(item, el);
                score += result[0] || 0;
                color.push(result[1]);
            })

            scores = +scores + score;
            colorClasses.push(color);
            scoreArr.push(score);
        })

        if (scores < +teacherData.passingScore) {
            notPass = 'not handed over';
        }
    }

    useEffect(() => {
            if (scores !== '') {
                const date = new Date();
                const fullDate = `${convertDate(date)}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                const resultObj = scoresAll.test ? scoresAll.test[teacherData.name] || {} : {};

                resultObj[testId] = {
                    'fullDate': fullDate,
                    'score': scores
                }

                scoresAll.test[teacherData.name] = resultObj;
            }
        }, [scores]
    );


    return (
        <div>
            {isSubmit ||
            <MovementOnTest questionsExam={questionsExam} isFinish={isFinish} setIsFinish={setIsFinish}
                            finishExam={finishExam} step={step} setStep={setStep} testDuration={testDuration}
                            scoreArr={scoreArr} notPass={notPass} scores={scores}/>
            }
            <div className={'questionContainer'}>
                <div className={'subject'}>
                    <h2>{teacherData.name}</h2>
                </div>
                {
                    isSubmit
                        ? <div>
                            <SubmitTest questionsExam={questionsExam}/>
                            <button onClick={attemptReturn}>Return to attempt</button>
                            <button onClick={finishExam} name={'finish'}>Finish testing</button>
                        </div>

                        : isFinish
                        ? <ShowCorrectAnswers questionsExam={questionsExam} isFinish={isFinish}
                                              colorClasses={colorClasses} startExam={startExam}
                                              completeReview={completeReview}/>
                        : <CreateExamData questionsExam={questionsExam} isFinish={isFinish} step={step}
                                          setStep={setStep} finishExam={finishExam}/>
                }
            </div>
        </div>
    )
}