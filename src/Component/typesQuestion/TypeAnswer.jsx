import React from 'react';
import {TextQuestion} from "./TextQuestion";
import {RadioOrCheckboxQuestion} from "./RadioOrCheckboxQuestion";

export function TypeAnswer({item, isFinish, score, setScore}) {
    let {answer, enteredAnswer} = item;
    let type = answer.length === 1 ? 'radio' : 'checkbox';

    console.log(item)

    const handleChange = (e) => {
        let value = e.target.value;

        if (type !== 'checkbox') {
            enteredAnswer = [];
            enteredAnswer.push(value.toLowerCase());
        } else {
            let index = enteredAnswer.indexOf(value);

            if (index === -1) {
                enteredAnswer.push(value);
            } else {
                enteredAnswer.splice(index, 1);
            }
        }

        item.enteredAnswer = enteredAnswer;
    }

    const correct = (el) => {
        let color;
        if (item.enteredAnswer.includes(el)) {
            if (item.enteredAnswer.join(', ') === item.answer.join(', ')) {
                color = 'green';
                score += 1;
            } else {
                color = 'red';
            }
        }
        return color;
    }

    const Type = () => {
        let len = Object.keys(item).length;

        if (len === 4) {
            return <TextQuestion item={item} handleChange={handleChange} isFinish={isFinish} score={score}
                                 correct={correct}/>

        } else {
            return <RadioOrCheckboxQuestion item={item} isFinish={isFinish} score={score}
                                            handleChange={handleChange} type={type} correct={correct}/>
        }
    }


    return (
        <div>
            <Type/>
        </div>
    )
}