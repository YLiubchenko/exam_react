import React, {useState, useEffect} from "react";

const TimeTest = ({testDuration, setIsFinish}) => {
    let [time, setTime] = useState(testDuration);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!time.seconds && !time.minutes && !time.hours) {
                clearInterval(timer);
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
    }, []);

    return (
        <div>
            <span>{String(time.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(time.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span>{String(time.seconds).padStart(2, '0')}</span>
        </div>
    )

}
export default TimeTest;