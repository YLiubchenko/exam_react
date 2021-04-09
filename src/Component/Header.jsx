import React from 'react';
import {NavLink} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {isSingIn} from "./reducers/login-reducer";

const Header = ({isAuth}) => {
    let fullName = useSelector(state => state.singIn.fullName);
    let dispatch = useDispatch();

    const logOut = () => {
        delete sessionStorage.user;
        dispatch(isSingIn());
    }

    return (
        <div className='header'>
            {isAuth
                ? <div>
                    <span>{fullName ? fullName : ''}</span>
                    /
                    <button onClick={logOut}>Log out</button>
                </div>
                : <div>
                    <NavLink to={'/login'}>Login</NavLink>
                    /
                    <NavLink to={'/registration'}>Registration</NavLink>
                </div>
            }
        </div>
    )
}

export default Header;