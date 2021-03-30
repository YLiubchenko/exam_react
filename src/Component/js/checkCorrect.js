import {isAnswerIncludes} from "./isAnswerIncludes";

export default function checkCorrect(item, el) {
    let color = '';
    let score;

    if (isAnswerIncludes(item.enteredAnswer, el)) {
        if (isAnswerIncludes(item.answer, el)) {
            color = 'green';
            score = 1 / item.answer.length;
        } else {
            color = 'red';
        }
    } else if (Object.keys(item).length === 4) {
        color = 'red';
    }

    return [score, color];
}