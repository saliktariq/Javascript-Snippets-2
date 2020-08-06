/*
An application that calculates and displays the age at death of each person included in the JSON data, and calculates and
displays the average age of death for all the persons included in the data.
 */

/*
Function isLeapYear calculates if year is a leap year.
The parameter year represents the year to calculate leap year for.
Returns boolean True if a leap year.
*/

function isLeapYear(year) {
    const DATE = new Date(year, 1, 28);
    DATE.setDate(DATE.getDate() + 1);
    return DATE.getMonth() === 1;
}

/*
Function getAge gets age with leap year consideration.
The parameter birthDate represents birth date of the resident.
The parameter deathDate represents death date of the resident.
Returns number age of the resident.
*/

function getAge(birthDate, deathDate) {
    const BIRTHDATE = new Date(birthDate);
    const DEATHDATE = new Date(deathDate);
    let years = DEATHDATE.getFullYear() - BIRTHDATE.getFullYear();
    BIRTHDATE.setFullYear(BIRTHDATE.getFullYear() + years);
    if (BIRTHDATE > DEATHDATE) {
        years -= 1;
        BIRTHDATE.setFullYear(BIRTHDATE.getFullYear() - 1);
    }
    const DAYS = (DEATHDATE.getTime() - BIRTHDATE.getTime()) / (3600 * 24000);
    return Math.round(years + DAYS / (isLeapYear(DEATHDATE.getFullYear()) ? 366 : 365));
}

/*
Function getAverageAge to get average age for all residents.
The parameter data data of all residents.
Returns number which gives average age.
*/

function getAverageAge(data) {
    const AGE = data.map(function (resident) {
        return getAge(resident.birthdate, resident.deathdate);
    });
    // Reducing the data map to a single value and taking average by dividing it to the number of records (data.length)
    return Math.floor(AGE.reduce((a, b) => a + b, 0) / data.length)
}


//Using $(document).ready to load the code insde this method only when all page resources are fully loaded
$(document).ready(function () {
    const WORKHOUSEDATA = [ // JSON Object nested in Array
        {
            "firstname": "Harold",
            "lastname": "Mullins",
            "birthdate": "07/04/1864",
            "deathdate": "09/11/1891"
        }, {
            "firstname": "Sarah",
            "lastname": "Houseman",
            "birthdate": "09/04/1864",
            "deathdate": "10/04/1866"
        }, {
            "firstname": "Alice",
            "lastname": "Davis",
            "birthdate": "11/12/1864",
            "deathdate": "04/10/1866"
        }, {
            "firstname": "Maud",
            "lastname": "Adams",
            "birthdate": "08/04/1864",
            "deathdate": "09/11/1908"
        }, {
            "firstname": "Seamus",
            "lastname": "O'Brien",
            "birthdate": "10/12/1864",
            "deathdate": "09/11/1901"
        }
    ];

    //Creating table structure

    let dataTable = $("<table><thead><tr><th>First Name</th><th>Last Name</th><th>Born</th><th>Died</th><th>Age At Death</th></tr></thead></table>");

    //Attaching table to the DOM at id= #consusdata provided in the HTML
    $("#censusdata").append(dataTable.attr('id','cenususdatatable'));

    //Iterating through the WORKHOUSEDATA JSON data structure to fill in the form.
    $.each(WORKHOUSEDATA,(index) => {
        dataTable.append(
            "<tr><td>" + WORKHOUSEDATA[index].firstname +
            "</td><td>" + WORKHOUSEDATA[index].lastname +
            "</td><td>" + WORKHOUSEDATA[index].birthdate +
            "</td><td>" + WORKHOUSEDATA[index].deathdate +
            "</td><td>" + getAge(WORKHOUSEDATA[index].birthdate, WORKHOUSEDATA[index].deathdate) +
            "</tr>");
    });

    //Attaching the Agerage age data to DOM at id=#averageageatdeath in the HTML
    $("#averageageatdeath").html(
        "Average age of death = " + getAverageAge(WORKHOUSEDATA) // Calculate average age of death
    );

});
