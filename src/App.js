import React, {useState, useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";

import './App.css';

import {TeacherPage} from "./Component/TeacherPage/TeacherPage";
import {useDispatch, useSelector} from "react-redux";
import {isSingIn} from "./Component/reducers/login-reducer";
import LoginFormRedux from "./Component/login/Login";
import RegistrationRedux from "./Component/login/Registration";
import ResultPage from "./Component/ResultsPage";
import {typeOfOrObj} from "./Component/MainPage/typeOfOrObj";
import TestsPage from "./Component/TestsPage";
import Header from "./Component/Header";
import Navigation from "./Component/Navigation";


function App() {
    const [teacherTest, setTeacherTest] = useState({});
    const [date, setDate] = useState('');
    const [scoresAll, setScoresAll] = useState({});
    const [resultsTest, setResultsTest] = useState({});
    let isAuth = useSelector(state => state.singIn.isAuth);
    let userId = useSelector(state => state.singIn.userId);
    let isTeacher = useSelector(state => state.singIn.isTeacher);
    let dispatch = useDispatch();

    // const test = {
    //     test1: {
    //         name: "test1",
    //         dateFinish: "2021-04-29",
    //         dateStart: "2021-03-10",
    //         evaluationMethod: "bestScore",
    //         passingScore: "1",
    //         questionsNumber: "10",
    //         timeFinish: "10:08",
    //         timeStart: "10:08",
    //         minute: 45,
    //         attemptsAllowed: '3',
    //     },
    //     test2: {
    //         name: "test2",
    //         dateFinish: "2021-04-29",
    //         dateStart: "2021-03-10",
    //         evaluationMethod: "bestScore",
    //         passingScore: "1",
    //         questionsNumber: "10",
    //         timeFinish: "10:08",
    //         timeStart: "10:08",
    //         minute: 45,
    //         attemptsAllowed: '3',
    //     },
    //     test3: {
    //         name: "test3",
    //         dateFinish: "2021-04-29",
    //         dateStart: "2021-03-10",
    //         evaluationMethod: "bestScore",
    //         passingScore: "1",
    //         questionsNumber: "10",
    //         timeFinish: "10:08",
    //         timeStart: "10:08",
    //         minute: 45,
    //         attemptsAllowed: '3',
    //     },
    //     test4: {
    //         name: "test4",
    //         dateFinish: "2021-04-29",
    //         dateStart: "2021-03-10",
    //         evaluationMethod: "bestScore",
    //         passingScore: "1",
    //         questionsNumber: "10",
    //         timeFinish: "10:08",
    //         timeStart: "10:08",
    //         minute: 45,
    //         attemptsAllowed: '3',
    //     },
    // }

    const getAllTest = () => {
        // setTeacherTest(test)
    }

    let lock = sessionStorage.getItem('user');

    useEffect(() => {
        if (lock) {
            const data = JSON.parse(lock);
            const {id, fullName, isTeacher} = data;

            dispatch(isSingIn(!isAuth, id, fullName, isTeacher));
        }
    }, []);

    const submit = async (values) => {
        let result;
        let data;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(values)
        };

        if (Object.keys(values).length > 2) {
            result = await fetch('http://localhost:3333/registration', requestOptions);
        } else {
            result = await fetch('http://localhost:3333/login', requestOptions);
        }

        data = await result.json();
        const {id, fullName, isTeacher} = data;
        setScoresAll(data);

        if (result.status === 201) {
            return alert(data.message);
        }

        sessionStorage.setItem('user', JSON.stringify(data));
        dispatch(isSingIn(!isAuth, id, fullName, isTeacher));
    }


    const clickShowResult = async () => {
        const response = await fetch('http://localhost:3333/results-page/' + userId);
        const res = await response.json();
        res.allTests = typeOfOrObj(res.allTests);
        setResultsTest(res.allTests);
        setTeacherTest(test)
    }

    return (
        <div className='app-wrapper'>
            <Header isAuth={isAuth}/>
            <Navigation isAuth={isAuth} isTeacher={isTeacher} clickShowResult={clickShowResult}
                        getAllTest={getAllTest}/>

            <div className='app-wrapper-content'>
                <Switch>

                    <Route exact path='/' render={() => <Redirect to={'/login'}/>}/>

                    <Route path={'/teacher-page'} className='container'>
                        {isTeacher &&
                        <TeacherPage setTeacherTest={setTeacherTest} teacherTest={teacherTest}/>
                        }
                    </Route>

                    <Route path={'/tests-page'}>
                        {isAuth &&
                        <TestsPage teacherTest={teacherTest} date={date} scoresAll={scoresAll} setDate={setDate}
                                   setScoresAll={setScoresAll}/>
                        }
                    </Route>

                    <Route path={'/results-page'}>
                        {!isAuth && !isTeacher ||
                        <ResultPage resultsTest={resultsTest} teacherTest={teacherTest}/>
                        }
                    </Route>

                    <Route path={'/login'}>
                        {!isAuth &&
                        <LoginFormRedux onSubmit={submit}/>
                        }
                    </Route>

                    <Route path={'/registration'}>
                        {!isAuth &&
                        <RegistrationRedux onSubmit={submit}/>}
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default App;