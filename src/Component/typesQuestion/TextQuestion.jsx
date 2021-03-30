import React, {useState} from 'react';

export function TextQuestion({item, handleChange, isFinish, step, colorClasses}) {
    const [value, setValue] = useState(item.enteredAnswer);

    const changeValue = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <span className='typeAnswer'>Answer: </span>

            <input type="text" name={item.id} placeholder={isFinish ? '' : 'Enter the answer'} onBlur={handleChange}
                   className={'inpText ' + (isFinish ? colorClasses[step][0] : '')} value={value}
                   onChange={changeValue} readOnly={isFinish}/>
        </div>
    )
}