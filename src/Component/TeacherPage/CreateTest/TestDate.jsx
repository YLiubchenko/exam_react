import React, {useState} from "react";
import DateStartEnd from "./DateStartEnd";
import {randomKeyMap} from "../../js/randomKeyMap";

export function TestDate() {
    const [selectedTime, setSelectedTime] = useState(
        {
            time: {},
            isCorrect: false
        }
    );

    let objTime = {};
    let duration = ['Start', 'Finish'];
    let [fullDate, fullTime] = '';
    let date = new Date();
    let time = [date.getHours(), date.getMinutes()];
    date = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    fullDate = padStartDate(date, '-');
    fullTime = padStartDate(time, ':');

    function padStartDate(arr, sign) {
        return arr.map(el => String(el).padStart(2, '0')).join(sign);
    }

    const DurationArr = () => duration.map(time => {
        return (
            <div key={randomKeyMap()}>
                <DateStartEnd time={time} fullDate={fullDate} fullTime={fullTime}
                              dateChange={dateChange} valueTime={selectedTime}/>
            </div>
        )
    })

    const dateChange = (e) => {
        let {dateStart, dateFinish, timeStart, timeFinish, hour, minute} = objTime;
        objTime[e.target.name] = e.target.value;

        if (dateStart > dateFinish) {
            console.log('oh no, it"s impossible')

        } else if (dateStart === dateFinish) {
            if (timeStart) {
                let arr = timeStart.split(':');
                arr[0] = +arr[0] + +hour || '';
                arr[1] = +arr[1] + +minute || '';
                if (arr[1] > 60) {
                    let remainder = Math.floor(arr[1] / 60);
                    arr[0] += remainder;
                    arr[1] -= (remainder * 60);
                }
                arr = padStartDate(arr, ':');
                if (arr > timeFinish) {
                    setSelectedTime({
                        time: objTime,
                        isCorrect: true
                    })
                }
            }
        }
    }

    return (
        <div>
            {DurationArr()}
            <div>
                <label>
                    Time limit:
                    <div>
                        <input type="number" name={'hour'} placeholder={'Hours'}
                               min={0} max={23} onBlur={dateChange}/>
                        <input type="number" name={'minute'} placeholder={'Minutes'}
                               min={0} max={59} onBlur={dateChange}/>
                    </div>
                </label>
            </div>
        </div>
    )
}