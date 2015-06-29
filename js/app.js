'use strict';

var myApp = {
    getAllRows: function() {
        return document.getElementById("table-wrapper").querySelectorAll("div");
    }
};

var myApp = (function() {
    var getAllRows = function(type){
        return document.getElementById("table-wrapper").querySelectorAll("div");
    };

    var getOddRows = function() {
        return getAllRows('odd');
    };

    var getEvenRows = function() {
        return getAllRows('even');
    };

    return {
        getOddRows: getOddRows,
        getEvenRows: getEvenRows
    };
}());


function getAllRows(){
    return document.getElementById("table-wrapper").querySelectorAll("div");
}

function fillEachColumn(index) {
    document.getElementsByClassName('name-column')[index].innerHTML = employees[index].fullname;
    document.getElementsByClassName('job-column')[index].innerHTML = employees[index].jobtitle;
    document.getElementsByClassName('grade-column')[index].innerHTML = employees[index].grade;
    document.getElementsByClassName('status-column')[index].innerHTML = employees[index].allocationstatus;
    document.getElementsByClassName('project-column')[index].innerHTML = employees[index].project;
    document.getElementsByClassName('booking-column')[index].innerHTML = employees[index].dateofbooking;
}

function verifyElementWithProperty(element){
    for(var index in employees){
        for(var employeeObj in employees[index]){
            if(employeeObj.indexOf(element) >= 0){
                fillEachColumn(index);
            }
        }
    }
}

function getColumnsAndHTMLElements(rows, columns, elementFromHTML, attribute) {
    for (var row = 0; row < rows.length; row++) {
        columns = rows[row].querySelectorAll("span");
        for (var index = 0; index < columns.length; index++) {
            elementFromHTML = document.getElementsByClassName(columns[index].className)[0];
            attribute = elementFromHTML.getAttribute("data-column-type");
            console.log(attribute);
        }
    }
    return attribute;
}


function populateTable(){
    var columns = "";
    var elementFromHTML = "";
    var attribute = "";

    var rows = getAllRows();
    attribute = getColumnsAndHTMLElements(rows, columns, elementFromHTML, attribute);
    verifyElementWithProperty(attribute);
}

populateTable();
