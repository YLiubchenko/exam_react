export function isAnswerIncludes(answerArr, element) {
    let result = false;
    for (let i = 0; i < answerArr.length; i++) {
        if (answerArr[i] === element) {
            result = true;
            break;
        }
    }
    return result;
}