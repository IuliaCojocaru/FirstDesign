/**
 * Created by icojocaru on 7/3/2015.
 */

myApp = myApp || {};

//TODO: setTimeout +  publish/subscriber pattern

myApp.search = (function(){
    "use strict";


    var searchApp = function(){
        this.employees = myApp.employees;
        this.init();
    };

    searchApp.prototype.init = function(){
        this.bindEvents();
    };

    searchApp.prototype.bindEvents = function(){
        //this.addEventOnSearch();
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

    };

    return searchApp;
})();

var searchField = document.querySelectorAll(".select-filter-by");

myApp.myInstance = new myApp.search();
myApp.pubSub.listen("customEvent", myApp.myInstance.filterItem);

searchField[0].addEventListener("keyup", function(e){
    var searchItem = e.target.value;
    myApp.pubSub.fire('customEvent', searchItem, 'fullname', myApp.myInstance);
});

