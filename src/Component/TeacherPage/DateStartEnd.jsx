import React from "react";

const DateStartEnd = (props) => {
    let {time, handleClick, fullDate, fullTime, dateChange, valueTime} = props;

    return (
        <div>
            <label>
                {time} test
                <input type="date" name={`date${time}`} onBlur={dateChange}
                       onChange={handleClick} min={fullDate}/>
                <input className={time === 'Finish' && valueTime.isCorrect ? 'incorrect': ''} type="time" name={`time${time}`} min={fullTime} onBlur={dateChange}
                       onChange={handleClick}/>
            </label>
        </div>
    )
}

export default DateStartEnd;
