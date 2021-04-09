import React from 'react';
import {NavLink} from "react-router-dom";


const Navigation = ({isAuth, isTeacher, getAllTest, clickShowResult}) => {

    return (
        <nav>
            <ul className='nav'>
                {isAuth &&
                <div>
                    {isTeacher
                        ? <li>
                            <NavLink to={'/teacher-page'} onClick={getAllTest}>Teacher page</NavLink>

                        </li>
                        : <div>
                            <li>
                                <NavLink to={'/tests-page'} onClick={getAllTest}>Tests page</NavLink>
                            </li>

                            <li>
                                <NavLink to={'/results-page'} onClick={clickShowResult}>All results</NavLink>
                            </li>
                        </div>
                    }
                </div>
                }
            </ul>
        </nav>
    )
}

export default Navigation;