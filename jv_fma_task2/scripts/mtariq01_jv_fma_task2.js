/*
An application that shows the current exchange rate for several major currencies against the US Dollar.
 */

/*
Function queryExchangeRate contains the data structure for exchange rates data.
The parameter variable key contains the string value of the option selected in the HTML page
The function returns exchange rate of type number denoting exchange rate of respective currency against US Dollar
 */

function queryExchangeRate(key) {

    const RATES = new Map(); //RATES of type Map containing key/value pairs of Currency names (keys) and exchange rates (values)
    RATES.set("UK Pounds", 0.77);
    RATES.set("Euros", 0.90);
    RATES.set("Yen", 109.54);
    RATES.set("Yuan", 6.95);
    RATES.set("Swiss Francs", 0.97);
    RATES.set("Canadian Dollars", 1.31);

    return RATES.get(key); //Returns value for the given key
}

/*
Function getFormSelection returns current selection of form drop down menu "currencies"
 */

function getFormSelection(){
    return document.getElementById("currencies").value; //returning current value of "currencies" id tag
}

/*
Function displayExchangeRate() displays the exchange rate on the HTML page.
The parameter variable query contains the exchange rate result
 */

function displayExchangeRate(query){
    return document.getElementById("exchangerate").innerHTML = "One US Dollar buys you " + query  + " " + getFormSelection();
}

/*
Function clearExchangeMessage clears the exchange rate message on the HTML page
 */
function clearExchangeMessage(){
    return document.getElementById("exchangerate").innerHTML = "";
}

/*
Function exchangeRateEventHandler is the default function that loads on change in options in HTML
It checks if the option selected is a valid option and passes it to queryExchangeRate function
for exchange rate. Prints exchange rate result to HTML page
*/
function exchangeRateEventHandler() {
    if (getFormSelection() !== "Select a Currency") { //Checking if a currency has been choosen
        const SELECTION = getFormSelection();  // Accessing the current selection of select menu on the HTML page
        displayExchangeRate(queryExchangeRate(SELECTION)); //Display message on the HTML page
    } else {
        clearExchangeMessage(); //Clears the message otherwise
    }
}

/*
The CSS rules provided are 'select' and 'body' which are applied to the HTML tags select and body by default
 */