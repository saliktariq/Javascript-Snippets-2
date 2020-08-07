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
    return (input.value.length >= 8);
}

/*
Function to check if the string is a valid email address
*/
function isValidEmail(input) {
    const REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return REGEX.test(input.value);
}

/*
Function validateInput() checks if the text entered in the form field is valid as per application specification.
Parameters are inputField containing the form field which can be either username or password field, and
fieldType which may contain 2 possible values: "usr" for username field type and "pwd" for password field type
Returns array containing boolean value and a message; boolean is true if inputField validation passes.
 */
function validateInput(inputField, fieldType) {
    let errorMsg = "";
    let result = [];

    if (fieldType === "usr") {
        const USER = document.getElementById(inputField);
        if (isValidEmail(USER)) {
            result.push(true);
            result.push(errorMsg);
            return result;
        } else {
            errorMsg = " Username must be a valid email address. ";
            result.push(false);
            result.push(errorMsg);
            return result;
        }
    }
    let validPassword = true;
    if (fieldType === "pwd") {
        const PASSWORD = document.getElementById(inputField);
        if (!hasEightChars(PASSWORD)) {
            errorMsg += " Password must be at least 8 characters long. ";
            validPassword = false;
        }
        if (!hasUpperCase(PASSWORD)) {
            errorMsg += " Password must contain an uppercase letter. ";
            validPassword = false;
        }
        if (!hasLowerCase(PASSWORD)) {
            errorMsg += " Password must contain a lowercase letter. ";
            validPassword = false;
        }
        if (!hasNumber((PASSWORD))) {
            errorMsg += " Password must contain a number. ";
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


    } else { //Execute if invalid fieldType is provided.
        result.push(false);
        errorMsg = fieldType + " is not a valid fieldType value. ";
        result.push(errorMsg);
        return result;
    }
}

/*
Function unmaskPassword unmasks password into clear text.
Parameter pwd contains the id of password field and repwd contains id of retype password field
 */

function unmaskPassword(pwd,repwd){
    const passwordField = document.getElementById(pwd);
    const retypePasswordField = document.getElementById(repwd);

    if(passwordField.type === "password"){
        passwordField.type = "text";
        retypePasswordField.type = "text";
    }
}


/*
Function clearError to clear the errors on the form
 */

function clearError(){
    const ERROR = document.querySelector(".error");
    if(ERROR){
        ERROR.style.display = "none";
    }
}

window.onload = () => {
    // Assigning the current form to thisForm variable retrieved by ID
    let thisForm = document.getElementById("regsiterdetails");
    // Creating event listener and attaching to the form
    thisForm.addEventListener("submit",
        (event) => {
            let stopSubmit = false;
            const passwordValue = document.getElementById("password").value;
            const retypedPasswordValue = document.getElementById("retypedpassword").value;

            clearError();

            if (!validateInput("username","usr")) {
                stopSubmit = true;
               console.log(validateInput("username","usr")); //todo: display error

            }
            if (!validateInput("password","pwd")) {
                stopSubmit = true;
                console.log(validateInput("password","pwd")); //todo: display error
            }

            if (passwordValue !== retypedPasswordValue) {
                stopSubmit = true;
                console.log("password mismatch");//todo: display error
            }

            if (stopSubmit) {
                event.preventDefault();
            }
        }, false);


    let checkbox = document.getElementById("showpasswords"); //https://stackoverflow.com/questions/14544104/checkbox-check-event-listener
    checkbox.addEventListener( 'change', function() {
        if(this.checked) {
            unmaskPassword("password", "retypedpassword");
        } else {
            document.getElementById("password").type = "password";
            document.getElementById("retypedpassword").type = "password";

        }
    });

};

// window.onload = () => {
//    togglePasswordVisibility("password","retypedpassword");
// }

