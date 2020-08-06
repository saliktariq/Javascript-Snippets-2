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
    return Math.floor(AGE.reduce((a, b) => a + b, 0) / data.length)
}

/**
 * Function to setup table and headers.
 * @param div container of table.
 */
function setupTable(div) {
    div.html($("<table><thead><tr></tr></thead><tbody></tbody></table>"));
    const tableRow = div.find("thead tr");
    tableRow.append("<th>First Name</th>");
    tableRow.append("<th>Last Name</th>");
    tableRow.append("<th>Born</th>");
    tableRow.append("<th>Died</th>");
    tableRow.append("<th>Age At Death</th>");
}

/**
 * Function to create a table row for each resident row.
 * @param div container of table.
 * @param resident resident data.
 */
function createResidentRow(div, resident) {
    const tableRow = $("<tr></tr>");
    tableRow.append("<td>" + resident.firstname + "</td>");
    tableRow.append("<td>" + resident.lastname + "</td>");
    tableRow.append("<td>" + resident.birthdate + "</td>");
    tableRow.append("<td>" + resident.deathdate + "</td>");
    tableRow.append("<td>" + getAge(resident.birthdate, resident.deathdate) + "</td>");

    div.find("tbody").append(tableRow);
}

$(document).ready(function () {
    const workHouseResidentData = [
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

    const container = $("#censusdata");
    // Setup table headers
    setupTable(container);
    // Create table body rows for each resident
    workHouseResidentData.forEach(function (resident) {
        createResidentRow(container, resident);
    });
    // Calculate average age of death
    $("#averageageatdeath").html(
        "Average age of death = " + getAverageAge(workHouseResidentData)
    );

    $("#censusdata").attr('id', 'cenususdatatable');

});
