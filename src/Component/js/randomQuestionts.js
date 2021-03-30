export function randomQuestions(data, countQuestion) {

    const keys = Object.keys(data);
    let examQuestions = [];
    let keysLength = keys.length;
    let remainder = countQuestion % keysLength;
    let number = remainder ? (countQuestion - remainder) / keysLength : countQuestion / keysLength;

    function randomNumber(typeQuestion) {
        return Math.floor(Math.random() * typeQuestion.length)
    }

    keys.forEach((item, i) => {
        const random = [];
        const key = Object.keys(data[item]);
        const typeQuestion = data[item][key];
        let flag = false;

        if (remainder) {
            number++;
            remainder--;
            flag = !flag;
        }

        for (let i = 0; i < number; i++) {
            let randomQuestion = randomNumber(typeQuestion);

            if (random.includes(randomQuestion)) {
                randomQuestion = randomNumber(typeQuestion);
            }

            random.push(randomQuestion);
            examQuestions.push(typeQuestion[randomQuestion]);
        }

        if (flag) {
            number--;
        }


    })

    return examQuestions.sort(() => Math.random() - 0.5);
}