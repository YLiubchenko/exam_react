import React, {useState} from "react";
import {TestDate} from "./TestDate";

export function TeacherPage({setTeacherTest, teacherTest}) {
    const [isCreateTest, setIsCreateTest] = useState(false);
    let mainObj = teacherTest;
    let obj = {};


    const createTest = () => {
        setIsCreateTest(true);
    }

    const handleClick = (e) => {
        const {name, value} = e.target;
        if (name === 'timeLimit') {
            obj[name] = value.split(':');
        } else {
            obj[name] = value;
        }
    }

    const saveTime = () => {
        mainObj[obj.name] = obj;
        setTeacherTest(mainObj);
        setIsCreateTest(!isCreateTest);
    }

    return (
        <div>
            {
                isCreateTest ?
                    <div className={'create'}>
                        <h2>To create a test, fill in all the necessary information</h2>
                        <div>
                            <h3>General</h3>
                            <div>
                                <div>
                                    <label>
                                        Name
                                        <input type="text" name={'name'} required onChange={handleClick}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Description
                                        <textarea name={'description'} onChange={handleClick}/>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Number of questions
                                        <input type="number" name={'questionsNumber'} onChange={handleClick} required/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Select time</h3>
                            <div>
                                <TestDate handleClick={handleClick} obj={obj}/>
                            </div>
                        </div>

                        <div>
                            <h3>Score</h3>
                            <div>Passing score
                                <input type="number" name={'passingScore'} onChange={handleClick} required/>
                            </div>
                            <div>
                                Attempts allowed
                                <select name="attemptsAllowed" onChange={handleClick} defaultValue={'notLimited'}
                                        required>
                                    <option value="notLimited">not limited</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div>
                                Evaluation method
                                <select name="evaluationMethod" defaultValue={"bestScore"}
                                        onChange={handleClick} required>
                                    <option value="bestScore">best score</option>
                                    <option value="firstAttempt">first attempt</option>
                                    <option value="lastAttempt">last attempt</option>
                                    <option value="averageGrade">average grade</option>
                                </select>
                            </div>
                            <button onClick={saveTime}>Save</button>
                        </div>
                    </div>
                    :
                    <div>
                        <button onClick={createTest}>Create test</button>
                    </div>
            }
        </div>
    )

}