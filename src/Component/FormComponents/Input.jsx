import {Field} from "redux-form";
import {randomKeyMap} from "../js/randomKeyMap";
import FieldInput from "./FieldComponent";

export const Input = ({label, data}) => {
    const {name, required, type} = data;

    return (
        <Field key={randomKeyMap()} name={name} component={FieldInput}
               required={required} type={type} label={label}/>
    )
}