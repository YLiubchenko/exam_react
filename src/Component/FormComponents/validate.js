const validate = values => {
    const errors = {};
    const val = /^(?!.*admin)(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{3,20}$/i;

    let {password, fullName, email, confirmPassword} = values;

    let pass = password?.replace(/ /g, '').length;

    if (!fullName) {
        errors.fullName = 'Required';
    } else if (fullName.length < 2) {
        errors.fullName = 'Minimum be 2 characters or more';
    } else if (!/^[A-Z]{1}[A-Za-z 0-9-]{1,12}$/i.test(fullName)) {
        errors.fullName = 'Invalid full name'
    }

    if (!email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
    }

    if (!password) {
        errors.password = 'Required'
    } else if (pass !== password.length) {
        errors.password = "You cannot enter a space."
    } else if (password.length < 3 && !val.test(password)) {
        errors.password = 'Must contain at least one number and one uppercase and lowercase letter and minimum be 8 characters or more';
    } else if (!val.test(password) && password.length <= 20) {
        errors.password = 'Must contain at least one number and one uppercase and lowercase letter.';
    } else if (password.length > 20) {
        errors.password = 'Must be maximum 20 characters';
    }

    if (!confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
}

export default validate;