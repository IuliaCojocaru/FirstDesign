/**
 * Created by icojocaru on 6/25/2015.
 */

'use strict';

var myApp = myApp || {};

myApp.employees = (function(){
    var employeesObject = [
        {
            fullname: "Ciba Mumu",
            jobtitle: "UI Developer",
            grade: "Senior Engineer",
            allocationstatus: "Allocated",
            project: "Trinity Mirror",
            dateofbooking: "10/05/2014"
        },
        {
            fullname: "Vrinceanu Valentin",
            jobtitle: "Java Developer",
            grade: "Senior Consultant",
            allocationstatus: "Not Allocated",
            project: "Visa",
            dateofbooking: "10/05/2014"
            },
        {
            fullname: "Bogdan Volosincu",
            jobtitle: ".NET Developer",
            grade: "Senior Technician",
            allocationstatus: "Allocated",
            project: "Graduates",
            dateofbooking: "10/05/2014"
            },
        {
            fullname: "Ciba Mumu",
            jobtitle: "UI Developer",
            grade: "Senior Engineer",
            allocationstatus: "Not Allocated",
            project: "Visa",
            dateofbooking: "10/05/2014"
            },
        {
            fullname: "Carmen Budau",
            jobtitle: "Business Analyst",
            grade: "Engineer",
            allocationstatus: "Not Allocated",
            project: "Denplan",
            dateofbooking: "10/05/2014"
            }
        ];

    return employeesObject;
}());

