/*
Function to check if the given input has number in it
 */
function hasNumber(input) {
    const REGEX = /\d/;
    return REGEX.test(input.value);
}

/*
Function to check if the given input has lowercase letter in it
 */
function hasLowerCase(input) {
    const REGEX = /[a-z]/;
    return REGEX.test(input.value);
}

/*
Function to check if the given input has uppercase letter in it
 */
function hasUpperCase(input) {
    const REGEX = /[A-Z]/;
    return REGEX.test(input.value);
}

/*
Function to check if the string length is minimum 8 characters
 */
function hasEightChars(input) {
    return (input >= 8);
}

/*
Function to check if the string is a valid email address
*/
function isValidEmail(input) {
    const REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return REGEX.text(input.value);
}

/*
Function validateInput() checks if the text entered in the form field is valid as per application specification.
Parameters are inputField containing the form field which can be either username or password field, and
fieldType which may contain 2 possible values: 1 for username field type and 2 for password field type
Returns true if valid otherwise false
 */
function validateInput(inputField, fieldType) {
    let errorMsg = "";
    let result = [];

    if ((fieldType.value !== 1) || (fieldType.value !== 2)) { //Checking if correct fieldType parameter has been passed
        result.push(false);
        errorMsg = fieldType.value;
        result.push(errorMsg);
        return result;

    }
    if (fieldType == 1) {
        const USER = document.getElementById(inputField);
        if (isValidEmail(USER)) {
            result.push(true);
            result.push(errorMsg);
            return result;
        } else {
            errorMsg = "Username must be a valid email address";
            result.push(false);
            result.push(errorMsg);
            return result;
        }
    }
    let validPassword = true;
    if (fieldType == 2) {
        const PASSWORD = document.getElementById(inputField);
        if (!hasEightChars(PASSWORD)) {
            errorMsg += "Password must be atleast 8 characteres long";
            validPassword = false;
        }
        if (!hasUpperCase(PASSWORD)) {
            errorMsg += "Password must contain an uppercase letter.";
            validPassword = false;
        }
        if (!hasLowerCase(PASSWORD)) {
            errorMsg += "Password must contain a lowercase letter.";
            validPassword = false;
        }
        if (!hasNumber((PASSWORD))) {
            errorMsg += "Password must contain a number";
            validPassword = false;
        }
        if (validPassword) {
            result.push(true);
            result.push(errorMsg);
            return result;
        } else {
            result.push(false);
            result.push(errorMsg);
            return result;
        }


    }
}

window.onload = function () {
    let USER = document.getElementById("password")
    console.log(validateInput(USER, 2));
}