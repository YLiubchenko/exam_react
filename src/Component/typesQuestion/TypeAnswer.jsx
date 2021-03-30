import React from 'react';
import {TextQuestion} from "./TextQuestion";
import {RadioOrCheckboxQuestion} from "./RadioOrCheckboxQuestion";

export function TypeAnswer({item, isFinish, step, colorClasses}) {
    let {answer, enteredAnswer} = item;
    let type = answer.length === 1 ? 'radio' : 'checkbox';

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

    const Type = () => {
        let len = Object.keys(item).length;

        if (len === 4) {
            return <TextQuestion item={item} handleChange={handleChange} isFinish={isFinish} colorClasses={colorClasses}
                                 step={step}/>

        } else {
            return <RadioOrCheckboxQuestion item={item} isFinish={isFinish} handleChange={handleChange} type={type}
                                            colorClasses={colorClasses} step={step}/>
        }
    }


    return (
        <div>
            <Type/>
        </div>
    )
}