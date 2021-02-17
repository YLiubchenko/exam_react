import React from 'react';
import {CheckCorrect} from "../ShowCorrectAnswers/CheckCorrect";

export function RadioOrCheckboxQuestion({item, handleChange, isFinish, type, correct}) {
    let {id, answers, enteredAnswer} = item;

    const AnswerLine = () => {
        return answers.map(answer => {
            const checked = () => {
                return isFinish && enteredAnswer.includes(answer);
            }



            return (
                <div className={isFinish && correct(answer)}>
                    <label key={Date.now() + Math.random()}>
                        {
                            isFinish
                                ? <input type={type} name={id} value={answer} defaultChecked={checked()}/>
                                : <input type={type} name={id} value={answer}/>
                        }
                        {answer}
                    </label>
                </div>
            )
        })
    }

    return (
        <div onChange={handleChange}>
            <AnswerLine/>
            {
                isFinish &&
                <CheckCorrect item={item}/>
            }
        </div>
    )
}