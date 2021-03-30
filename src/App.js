import React, {useState, useEffect} from "react";

import './App.css';
import {Link, Route, Switch, Redirect} from "react-router-dom";
import {TeacherPage} from "./Component/TeacherPage/TeacherPage";
import {useDispatch, useSelector} from "react-redux";
import {isSingIn} from "./Component/reducers/login-reducer";
import LoginFormRedux from "./Component/login/Login";
import RegistrationRedux from "./Component/login/Registration";
import ResultPage from "./Component/ResultsPage";
import {typeOfOrObj} from "./Component/MainPage/typeOfOrObj";
import TestsPage from "./Component/TestsPage";


function App() {
    const [teacherTest, setTeacherTest] = useState({});
    const [date, setDate] = useState('');
    const [scoresAll, setScoresAll] = useState({});
    const [resultsTest, setResultsTest] = useState({});
    let isAuth = useSelector(state => state.singIn.isAuth);
    let userId = useSelector(state => state.singIn.userId);
    let fullName = useSelector(state => state.singIn.fullName);
    let dispatch = useDispatch();

    const test = {
        test1: {name: "test1", questionsNumber: "10"},
        test2: {name: "test2", questionsNumber: "3"},
        test3: {name: "test3", questionsNumber: "5"},
        test4: {name: "test4", questionsNumber: "7"}
    }

    const clickTestsPage = () => {
        setTeacherTest(test)
    }

    let lock = sessionStorage.getItem('user');

    useEffect(() => {
        if (lock) {
            let data = JSON.parse(lock);
            dispatch(isSingIn(!isAuth, data.id, data.fullName));
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
        setScoresAll(data);

        if (result.status === 201) {
            return alert(data.message);
        }

        sessionStorage.setItem('user', JSON.stringify(data));

        dispatch(isSingIn(!isAuth, data.id, data.fullName));
    }

    const logOut = () => {
        delete sessionStorage.user;
        dispatch(isSingIn());
    }

    const clickShowResult = async () => {
        const response = await fetch('http://localhost:3333/results-page/' + userId);
        const res = await response.json();
        res.allTests = typeOfOrObj(res.allTests);
        setResultsTest(res.allTests);
        setTeacherTest(test)

    }

    return (
        <div>
            <nav>
                <ul>
                    {isAuth &&
                    <div>
                        <li>
                            <Link to={'/teacher-test'}>Teacher page</Link>
                        </li>

                        <li>
                            <Link to={'/tests-page'} onClick={clickTestsPage}>Tests page</Link>
                        </li>

                        <li>
                            <Link to={'/results-page'} onClick={clickShowResult}>All results</Link>
                        </li>
                    </div>
                    }
                    <li>
                        <div>
                            {isAuth
                                ? <div>
                                    <span>{fullName ? fullName : ''}</span>
                                    /
                                    <button onClick={logOut}>Log out</button>
                                </div>
                                : <div>
                                    <Link to={'/login'}>Login</Link>
                                    /
                                    <Link to={'/registration'}>Registration</Link>
                                </div>
                            }
                        </div>
                    </li>

                </ul>
            </nav>

            <Switch>

                <Route exact path='/' render={() => <Redirect to={'/login'}/>}/>

                <Route path={'/teacher-test'} className='container'>
                    <TeacherPage setTeacherTest={setTeacherTest} teacherTest={teacherTest}/>
                </Route>

                <Route path={'/tests-page'}>
                    {isAuth &&
                    <TestsPage teacherTest={teacherTest} date={date} scoresAll={scoresAll} setDate={setDate}
                               setScoresAll={setScoresAll}/>
                    }
                </Route>

                <Route path={'/results-page'}>
                    {isAuth &&
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
    )
}

export default App;