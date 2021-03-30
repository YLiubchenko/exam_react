import {typeOfOrObj} from "./typeOfOrObj";

function evaluateMethod (scoresAll, teacherData) {
    let result = '';
    const scores = [];
    const fullDates = [];
    const {evaluationMethod, name} = teacherData;

    scoresAll.test = scoresAll.test && typeOfOrObj(scoresAll.test);
    const test = scoresAll.test && scoresAll.test[name];
    const keys = Object.keys(test);

    keys.forEach((el, i) => {
        scores.push(test[el].score);
        fullDates.push(test[el].fullDate);

    })

    const valueLength = scores.length;



    switch (evaluationMethod) {
        case 'bestScore':
            result = valueLength ? Math.max(...scores) : 0;
            break;
        case 'firstAttempt':
            result = scores[0];
            break;
        case 'lastAttempt':
            result = scores[valueLength - 1];
            break;
        case 'averageGrade':
            result = scores.reduce((sum, score) => sum + score, 0) / valueLength;
            break;
        default:
            result = 0;
    }

    scoresAll.allTests = typeOfOrObj(scoresAll.allTests);
    scoresAll.allTests = scoresAll.allTests || {};
    scoresAll.allTests[name] = result;

    return {result, scores, fullDates};
}

export default evaluateMethod;