export function randomQuestions (data, number) {
    const keys = Object.keys(data);
    let examQuestions = [];

    function randomNumber(typeQuestion) {
        return Math.floor(Math.random() * typeQuestion.length)
    }

    keys.forEach(item => {
        const random = [];
        const key = Object.keys(data[item]);
        const typeQuestion = data[item][key];

        for (let i = 0; i < number; i++) {
            let randomQuestion = randomNumber(typeQuestion);

            if (random.includes(randomQuestion)) {
                randomQuestion = randomNumber(typeQuestion);
            }

            random.push(randomQuestion);
            examQuestions.push(typeQuestion[randomQuestion]);
        }
    })

   return examQuestions.sort(() => Math.random() - 0.5);
}