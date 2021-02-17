import React from 'react'

export function CheckCorrect({item}) {
    return (
        <div className='answer'>
            {item.answer[0] === item.enteredAnswer[0]
                ? <p>Your answer is correct</p>
                : <div>
                    <p>Your answer is incorrect</p>
                    <p>Correct answer: {item.answer.join(', ')}</p>
                </div>
            }
        </div>
    )
}