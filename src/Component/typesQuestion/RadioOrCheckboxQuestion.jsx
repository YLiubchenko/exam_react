import React, {useState} from 'react';
import {CheckCorrect} from "../ShowCorrectAnswers/CheckCorrect";
import {isAnswerIncludes} from "../js/isAnswerIncludes";
import {randomKeyMap} from "../js/randomKeyMap";

export function RadioOrCheckboxQuestion({item, handleChange, isFinish, type, step, colorClasses}) {
    let {id, answers, enteredAnswer} = item;
    let obj = {};

    item.answers.forEach(el => obj[el] = isAnswerIncludes(enteredAnswer, el));

    const [check, setCheck] = useState(obj);


    const AnswerLine = () => {
        return answers.map((answer, index) => {
            let newObj = Object.assign({}, check);
            if (isFinish) {
                newObj[answer] = isAnswerIncludes(enteredAnswer, answer);
            }

            const click = (e) => {
                if (isFinish) {
                    return false;
                }

                newObj[e.target.value] = e.target.checked;
                setCheck(newObj);
            }


            return (
                <div className={isFinish ? colorClasses[step][index] : ''} key={randomKeyMap()}>
                    <label>
                        <input type={type} name={id} value={answer} checked={isFinish ? newObj[answer] : check[answer]}
                               onChange={click} readOnly={isFinish}/>
                        {answer}
                    </label>
                </div>
            )
        })
    }

    return (
        <div onChange={handleChange}>
            {type === 'radio'
                ? <span className='typeAnswer'>Select one: </span>
                : <span className='typeAnswer'>Select one or more: </span>
            }
            <AnswerLine/>
            {
                isFinish &&
                <CheckCorrect item={item}/>
            }
        </div>
    )
}