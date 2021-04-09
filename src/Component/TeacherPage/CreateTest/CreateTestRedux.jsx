import {Field, reduxForm} from "redux-form";

import {TestDate} from "./TestDate";
import {Input} from "../../FormComponents/Input";
import FieldInput from "../../FormComponents/FieldComponent";
import Select from "../../FormComponents/Select";

const CreateTest = ({handleSubmit}) => {
    const selectsValue = {
        'Attempts allowed': ["Not limited", "1", "2", "3"],
        'Evaluation method': ["Best score", "First attempt", "Last attempt", "Average grade"]
    }

    const generalData = {
        'Name': {type: 'text', name: 'name', required: true},
        'Description': {type: 'textarea', name: 'description'},
        'Number of questions': {type: 'number', name: 'questionsNumber', required: true},
    }

    const General = ({values}) => {
        const inputsValue = Object.keys(values);

        const Inputs = ({inputsValue}) => {

            return inputsValue.map(el => {
                return (
                    <Input label={el} data={generalData[el]} key={el}/>
                )
            })
        }

        return (
            <div>
                <Inputs inputsValue={inputsValue}/>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>General</h3>
                <General values={generalData}/>
            </div>
            <div>
                <h3>Select time</h3>
                Time limit:
                <div>

                    <TestDate/>
                </div>

                <div>
                    <h3>Score</h3>
                    <div>
                        <Field name='passingScore' component={FieldInput} required={true} type="number"
                               label='Passing score'/>
                    </div>

                    <Select options={selectsValue['Attempts allowed']} name='evaluationMethod' label='Attempts allowed'/>

                    <Select options={selectsValue['Evaluation method']} name='attemptsAllowed' label='Evaluation method'/>

                    <button>Create</button>
                </div>
            </div>
        </form>
    )
}

const CreateTestRedux = reduxForm({form: 'createTest'})(CreateTest);

export default CreateTestRedux;
