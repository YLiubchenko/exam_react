import React from 'react';
import './../../App.css';
import TimeTest from "./TimeTest";


export function CountQuestions(props) {

    let {finishExam, questionsExam, setStep, step, setIsFinish, isFinish, testDuration, scoreArr} = props;

    const Count = () => {
        return questionsExam.map((el, index) => {
            let orActive = step === index;
            let color = '';
            if (isFinish) {
                switch (scoreArr[index]) {
                    case 1:
                        color = 'green';
                        break;
                    case 0:
                        color = 'red';
                        break;
                    default:
                        color = 'orange';
                }
            }

            let answerOrNot = '';
            let enteredAnswerLength = el.enteredAnswer.length;
            let answerLength = el.answer.length;

            if(enteredAnswerLength ===  answerLength || enteredAnswerLength >  answerLength){
                answerOrNot = 'answerAlready';
            } else if (enteredAnswerLength < answerLength && enteredAnswerLength > 0) {
                answerOrNot = 'incompleteAnswer';
            }

            return (
                <button key={Math.floor(Math.random() * 10000)}
                        className={`countBtn ${orActive ? 'active' : ''} ${answerOrNot} ${color}`}
                        onClick={(e) => setStep(index)}>{index + 1}</button>
            )
        });
    }

    return (
        <div>
            <Count/>
            {!isFinish &&
            <div>
                <TimeTest testDuration={testDuration} setIsFinish={setIsFinish} isFinish={isFinish}/>
                <button onClick={finishExam}>Finish testing</button>
            </div>
            }
        </div>
    )
}