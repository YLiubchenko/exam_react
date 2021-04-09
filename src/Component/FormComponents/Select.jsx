import {randomKeyMap} from "../js/randomKeyMap";
import {Field} from "redux-form";

const Select = ({name, options, label}) => {

    const Options = () => {
        return options.map((el) => {
            return (
                <option value={el} key={randomKeyMap()}>{el}</option>
            )
        })
    }

    return (
        <div>
            {label}
            <Field name={name} component='select' required>
                <option/>
                <Options/>
            </Field>
        </div>
    )
}

export default Select;