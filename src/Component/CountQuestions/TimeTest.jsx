import React, {useState, useEffect} from "react";

const TimeTest = ({testDuration, setIsFinish, isFinish}) => {
    let [time, setTime] = useState(testDuration);
    let timeDown = '';

    if (!time.hours && !time.minutes && time.seconds) {
        timeDown = 'timeRunningOut';
    }

    useEffect(() => {

        let intervalId = setInterval(() => {
            if (isFinish) {
                return clearInterval(intervalId);
            }

            if (!time.seconds && !time.minutes && !time.hours) {
                setIsFinish(true);
            }

            if (!time.seconds && time.minutes) {
                setTime({
                    hours: time.hours,
                    minutes: --time.minutes,
                    seconds: time.seconds = 59
                })
            }

            if (!time.seconds && !time.minutes && time.hours) {
                setTime({
                    hours: --time.hours,
                    minutes: time.minutes = 59,
                    seconds: time.seconds = 59
                })
            }

            if (time.seconds) {
                setTime(
                    {
                        hours: time.hours,
                        minutes: time.minutes,
                        seconds: time.seconds--
                    }
                )
            }
        }, 1000);
        return () => clearInterval(intervalId);

    }, []);


    return (
        <div className={timeDown}>
            <span>{String(time.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(time.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(time.seconds).padStart(2, '0')}</span>
        </div>
    )
}
export default TimeTest;