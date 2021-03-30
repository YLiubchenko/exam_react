import React from 'react';

export function MovementOnQuestion({step, setStep, dataLength, finishExam}) {
    return (
        <div>
            {step > 0 && <button onClick={() => setStep(step - 1)}>previous</button>}

            {
                step < (dataLength - 1) &&
                <button onClick={() => setStep(step + 1)}>next</button>
            }
            {
                step === (dataLength - 1) &&
                <button onClick={finishExam}>Finish testing</button>
            }
        </div>
    )
}