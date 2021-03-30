import React, {useState, useEffect} from 'react';

export function Score({scoreResult}) {
    let [score, setScore] = useState(0);
    useEffect(() => {
        setScore(scoreResult);
    }, []);

    return (
        <span>{score}</span>
    )
}