import './App.css';
import React, {useState, useEffect} from 'react';

import {MainPage} from "./Component/MainPage/MainPage";
import {randomQuestions} from "./Component/randomQuestionts";

function App() {
    let [data, setData] = useState(null);
    let questionsExam;


    useEffect(() => {
        const getData = async () => {
            let fetchUrl = await fetch('api.json');
            let dataJSON = await fetchUrl.json();
            setData(dataJSON);
        }

        getData();

    }, []);

    if (data) {
        questionsExam = randomQuestions(data, 5);
    }

    return (
        <div className={'App'}>
            {data && <MainPage questionsExam={questionsExam}/>}
        </div>
    );
}

export default App;
