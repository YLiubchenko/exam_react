import React from 'react';
import {Link} from "react-router-dom";
import {randomKeyMap} from "../../js/randomKeyMap";

const CreateLink = ({testsName, link, click}) => {
    return testsName.map(name => {
        return (
            <li key={randomKeyMap()}>
                <Link to={`/${link}/${name}`} onClick={click} name={name}>{name}</Link>
            </li>
        )
    })
}

export default CreateLink;