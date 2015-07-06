/**
 * Created by icojocaru on 7/3/2015.
 */

myApp = myApp || {};

//TODO: setTimeout +  publish/subscriber pattern

myApp.search = (function(){
    "use strict";

    var searchApp = function(){
        this.employees = myApp.employees;
    };

    searchApp.prototype.init = function(){
        this.bindEvents();
    };

    searchApp.prototype.bindEvents = function(){

    };

    searchApp.prototype.filterItem = function(item, nameColumn){
        var word = item.toLowerCase(),
            rows = document.querySelectorAll(".table-wrapper .row");

        for(var i = 0; i < this.employees.length; i++){
            nameColumn = (this.employees[i].fullname).toLowerCase();
            if(nameColumn.indexOf(word) != -1){
                rows[i].style.display = "table-row";
            }else{
                rows[i].style.display = "none";
            }
        }
    };

    searchApp.prototype.filterHeader = function(item){
        var word = item.toLowerCase(),
            tableHeader = document.querySelector(".table-header"),
            column = tableHeader.getElementsByTagName("span");

        for(var index = 0; index < column.length; index++){
            var currentColumn = column[index].textContent;
            if(currentColumn.toLowerCase().indexOf(word) != -1){
                column[index].style.backgroundColor = "red";
            }
        }
    };

    return searchApp;
})();

var searchField = document.querySelector(".select-filter-by");
var myForm = document.querySelector(".employees-selection");

myApp.myInstance = new myApp.search();
//myApp.pubSub.listen("customEvent", myApp.myInstance.filterItem);
myApp.pubSub.listen("searchFilterEvent", myApp.myInstance.filterHeader);

myForm.addEventListener("submit", function(e){
    e.preventDefault();
});

searchField.addEventListener("keyup", function(e){
    var searchItem = e.target.value;
  //  myApp.pubSub.fire('customEvent', searchItem, 'fullname', myApp.myInstance);
    myApp.pubSub.fire('searchFilterEvent', searchItem, 'header', myApp.myInstance);
});
