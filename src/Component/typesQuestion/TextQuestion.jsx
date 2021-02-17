import React from 'react';

export function TextQuestion({item, handleChange, isFinish, correct}) {

    return (
        <div>
            {
                isFinish
                    ? <div>
                        <input type="text" value={item.enteredAnswer}
                               className={'inpText ' + (!item.enteredAnswer[0] ? 'red' : correct(item.enteredAnswer[0]))}/>
                        <div className='answer'>
                            Correct answer {item.answer}
                        </div>
                    </div>

                    : <input type="text" name={item.id} placeholder='Enter the answer' onBlur={handleChange}
                             className={'inpText'}/>
            }
        </div>
    )
}