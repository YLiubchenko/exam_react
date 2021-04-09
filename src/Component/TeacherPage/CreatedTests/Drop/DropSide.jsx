import React from "react";
import {randomKeyMap} from "../../../js/randomKeyMap";

const DropSide = ({students, clickOnStudent}) => {

    const All = () => {
        if (students && students.length) {
            return students.map(email => {
                return <div className={'drop-item'} key={randomKeyMap()} onClick={clickOnStudent}>{email}</div>
            })
        }
        return <></>;
    }

    return (
        <div className='drop'>
            <All/>
        </div>
    )
}

export default DropSide;