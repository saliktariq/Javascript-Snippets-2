/*
Function to check if the given input has number in it
 */
function hasNumber(input) {
    const REGEX = /\d/; //regular expression for 'contains' numbers
    return REGEX.test(input.value); //checking if the given input contains numbers
}

/*
Function to check if the given input has lowercase letter in it
 */
function hasLowerCase(input) {
    const REGEX = /[a-z]/; //regular expression for 'contains' lowercase alphabets
    return REGEX.test(input.value); //checking if the given input 'contains' lowercase alphabets
}

/*
Function to check if the given input has uppercase letter in it
 */
function hasUpperCase(input) {
    const REGEX = /[A-Z]/; //regular expression for 'contains' uppercase alphabets
    return REGEX.test(input.value); //checking if the given input 'contains' lowercase alphabets
}

/*
Function to check if the string length is minimum 8 characters
 */
function hasEightChars(input) {
    return (input.value.length >= 8); //Checking if the input contains at least 8 characters
}

/*
Function to check if the string is a valid email address
*/
function isValidEmail(input) {
    if (input.value.length > 0) { //safety net to make sure blank input is not tested
        const REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //reg expression for valid email address
        return REGEX.test(input.value); //checking if input value is a valid email address
    }
    return false;
}

/*
Function validateInput() checks if the text entered in the form field is valid as per application specification.
Parameters are inputField containing the form field which can be either username or password field, and
fieldType which may contain 2 possible values: "usr" for username field type and "pwd" for password field type
Returns array containing boolean value and a message; boolean is true if inputField validation passes.
 */
function validateInput(inputField, fieldType) {
    let errorMsg = ""; //Variable to contain error messages
    let result = []; //Array that will be returned by the function

    if (fieldType === "usr") {
        const USER = document.getElementById(inputField); //retrieving inputField data into USER constant from DOM
        if (isValidEmail(USER)) { //if USER contains a valid email address; query isValidEmail for validation
            result.push(true); //pushing boolean into result array
            result.push(errorMsg); //pushing error message into result array
            return result; //returning result array
        } else {
            errorMsg = " Username must be a valid email address. "; //error message if isValidEmail fails validation
            result.push(false); //pushing boolean into result array
            result.push(errorMsg); //pushing error message into result array
            return result; //returning result array
        }
    }
    let validPassword = true;
    if (fieldType === "pwd") {
        const PASSWORD = document.getElementById(inputField); //retrieving inputField data into PASSWORD constant from DOM
        if (!hasEightChars(PASSWORD)) { //checking if PASSWORD has at least 8 characters, if it does not, proceed inside if block
            errorMsg += " Password must be at least 8 characters long. "; //error messages
            validPassword = false; //validPassword variable turned to false as the above condition did not meet
        }
        if (!hasUpperCase(PASSWORD)) { //checking if PASSWORD has at least one upper case character, if it does not, proceed inside if block
            errorMsg += " Password must contain an uppercase letter. "; //error messages
            validPassword = false; //validPassword variable turned to false as the above condition did not meet
        }
        if (!hasLowerCase(PASSWORD)) { //checking if PASSWORD has at least one lower case character, if it does not, proceed inside if block
            errorMsg += " Password must contain a lowercase letter. "; //error messages
            validPassword = false; //validPassword variable turned to false as the above condition did not meet
        }
        if (!hasNumber((PASSWORD))) { //checking if PASSWORD has at least one number, if it does not, proceed inside if block
            errorMsg += " Password must contain a number. "; //error messages
            validPassword = false; //validPassword variable turned to false as the above condition did not meet
        }
        if (validPassword) { //if validPassword variable is true
            result.push(true); //push boolean true into result array
            result.push(errorMsg); //push any error message into result array
            return result;
        } else {
            result.push(false); //if validPassword variable is not true
            result.push(errorMsg); //push the errorMsg string into result array
            return result;
        }


    } else { //Execute if invalid fieldType is provided. Useful for person managing the code.
        result.push(false);
        errorMsg = fieldType + " is not a valid fieldType value. "; //Error for wrong fieldType. Available for information for programming error
        result.push(errorMsg);
        return result;
    }
}

/*
Function unmaskPassword unmasks password into clear text.
Parameter pwd contains the id of password field and repwd contains id of retype password field
 */

function unmaskPassword(pwd, repwd) {
    const passwordField = document.getElementById(pwd); //retrieve the password field
    const retypePasswordField = document.getElementById(repwd); //retrieve the retypedpassword field

    if (passwordField.type === "password") { //if the password field type is set to "password"
        passwordField.type = "text"; //change password field type to "text"
        retypePasswordField.type = "text"; //change retypedpassword field type to "text"
    }
}

/*
Function clearError to clear the errors on the form
 */

function clearError() {
    const ERRORS = document.querySelectorAll(".error"); //Get all elements from DOM with css selector .error
    if(ERRORS){ //if elements are retrieved, proceed into if block
        ERRORS.forEach(function (result){ //iterate through the NodeList
            result.style.display = "none"; //set their CSS property to display = "none
        });
    }
}

/*
Function displayErrors to display error messages
Parameters are errorMessage containing error message string and pos containing position of error to be displayed in DOM
*/

function displayErrors(errorMessage, pos) {

    const POSITION = document.getElementById(pos); //retrieve the element as set by position parameter
    const ERROR = document.createElement("div"); //create new error element
    ERROR.id = 'error'; //attach id="error" to the element. This id is redundant in this code but placed as may be used in future
    ERROR.innerHTML = errorMessage; //attaching errorMessage from parameter
    ERROR.classList.add("error"); //attaching .error class to the new DOM element

    POSITION.parentNode.insertBefore(ERROR, POSITION.nextSibling); //inserting the new error message element
    ERROR.style.display = "block"; //setting its css to display = "block"
}

window.onload = () => {
    // Assigning the current form to thisForm variable retrieved by ID
    let thisForm = document.getElementById("regsiterdetails");
    // Creating event listener and attaching to the form
    thisForm.addEventListener("submit",
        (event) => {

            let stopSubmit = false; //Variable that would prevent form submission if validation fails
            const passwordValue = document.getElementById("password"); //retrieving password element
            const retypedPasswordValue = document.getElementById("retypedpassword"); //retrieving retypedpassword element

            clearError(); //clearing any erros that are already displayed on the form

            if (!validateInput("username", "usr")[0]) { //retrieving boolean from returned array at position 0 in array containing if validation succeeded
                stopSubmit = true; //turn stopSubmit to true if above validation fails
                displayErrors(validateInput("username", "usr")[1], "username"); //display relevant error from returned array at position 1
            }
            if (!validateInput("password", "pwd")[0]) { //retrieving boolean from returned array at position 0 in array containing if validation succeeded
                stopSubmit = true; //turn stopSubmit to true if above validation fails
                displayErrors(validateInput("password", "pwd")[1], "password"); //display error from returned array at position 1

            }

            if (passwordValue.value !== retypedPasswordValue.value) { //if password and retypedpassword are not equal
                stopSubmit = true; //set stopSubmit variable to true
                displayErrors("Password and retype password must match!", "passwordmatcherror"); //display this error at point id=passwordmatcherror
            }

            if (stopSubmit) { //if stopSubmit boolean is true
                event.preventDefault(); //stop form from submitting
            }

        }, false);


    let checkbox = document.getElementById("showpasswords"); //https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
    checkbox.addEventListener('change', function () {
        if (this.checked) { //if current checkbox is checked
            unmaskPassword("password", "retypedpassword"); //unmask the password and retyped password
        } else {
            document.getElementById("password").type = "password"; //otherwise set the type of field back to password
            document.getElementById("retypedpassword").type = "password"; //otherwise set the type of field back to password

        }
    });

};
