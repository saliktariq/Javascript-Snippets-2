/*
 An application that validates a registration form
 */

/*
Function validateInput() checks if the text entered in the form field is valid as per application specification.
Parameters are inputField containing the form field which can be either username or password field, and
fieldType which may contain 2 possible values: 1 for username field type and 2 for password field type
Returns true if valid otherwise false
 */
function validateInput(inputField,fieldType){
    let errorMsg = "";
    let result = [];

    if ((fieldType !== 1) || (fieldType !== 2)){ //Checking if correct fieldType parameter has been passed
        result.push(false);
        result.push(errorMsg);
        return result;

    }
    if (fieldType === 1){
        const USER = document.getElementById(inputField);
        const REGEXP = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (REGEXP.test(USER.value)){
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

    if (fieldType === 2){
        const PASSWORD = document.getElementById(inputField);
        const REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if(REGEXP.test(PASSWORD.value)){
            result.push(true);
            result.push(errorMsg);
            return result;
        } else {
            if(!(/\d/.test(PASSWORD))){
                errorMsg += "Password must contain a number";
            }
            if(!((/[a-z]/.test(PASSWORD)))){
                errorMsg += "Password must contain a lowercase letter.";
            }
            if(!((/[A-Z]/.test(PASSWORD)))){
                errorMsg += "Password must contain an uppercase letter.";
            }
            if(PASSWORD.length < 8){
                errorMsg += "Password must be atleast 8 characteres long";
            }
            result.push(false);
            result.push(errorMsg);
            return result;


        }
    }
}
/**
 * Function checkUsername checks if a username entered is a valid email address
 * @param username containing the id of username input field of form.
 * @returns boolean true if username is valid email address otherwise false
 * @author Salik Tariq
 */
function checkUsername(username) {
    const usernameField = document.getElementById(username);
    //Regex source: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegExp.test(usernameField.value);
}

/**
 * Function checkPassword checks if the password entered must be 8
 * characters and include one uppercase, one lowercase and one numeric.
 * @param password containing the id of password input field of form.
 * @returns boolean true if password meets the required complexity
 */
function checkPassword(password) {
    let passwordField = document.getElementById(password);
    //Regex source: https://stackoverflow.com/questions/14850553/javascript-regex-for-password-containing-at-least-8-characters-1-number-1-uppe
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    return passwordRegExp.test(passwordField.value);
}

/**
 * Function togglePasswordVisibility shows/hides password fields in the form
 * @param pwd containing the id of the password field
 * @param retypepwd containing the id of the retype password field
 */
function togglePasswordVisibility(pwd, retypepwd) {
    const passwordField = document.getElementById(pwd);
    const retypePasswordField = document.getElementById(retypepwd);
    const typeToChange = passwordField.type === "password" ? "text" : "password";

    passwordField.type = typeToChange;
    retypePasswordField.type = typeToChange;
}

/**
 * Function to display error messages
 *
 * @param errorMessage containing text string containing error.
 */
function displayErrors(errorMessage) {
    let errorElement = document.querySelector(".error");

    if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error");

        const elementPosition = document.getElementById("passwordmatcherror");
        elementPosition.parentNode.insertBefore(errorElement, elementPosition.nextSibling);
    }

    errorElement.style.display = "block";
    document.querySelector(".error").innerHTML = errorMessage;
}

/**
 * Function to clear error message on the form.
 */
function clearError() {
    const errorElement = document.querySelector(".error");

    if (errorElement) {
        errorElement.style.display = "none";
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

            if(!validateInput("username",1)[0]){
           // if (!checkUsername("username")) {
                stopSubmit = true;
                displayErrors(validateInput("username",1)[1], "username");
            } else if (!validateInput("password",2)[0]) {
                stopSubmit = true;
                displayErrors(validateInput("password",2)[1], "password");
            } else if (passwordValue !== retypedPasswordValue) {
                stopSubmit = true;
                displayErrors("Password Mismatch!");
            }

            if (stopSubmit) {
                event.preventDefault();
            }
        }, false);

    // Assigning the show passwords toggle to showPasswordsCheckbox variable retrieved by ID
    let showPasswordsCheckbox = document.getElementById("showpasswords");
    // Creating event listener and attaching to the checkBox
    showPasswordsCheckbox.addEventListener("change", function () {
        togglePasswordVisibility("password", "retypedpassword");
    });
};
