/**
 * Created by icojocaru on 7/3/2015.
 */

myApp = myApp || {};

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
        this.addEventOnSearch();
    };

    searchApp.prototype.filterItem = function(item){
        var word = item.toLowerCase(),
            rows = document.querySelectorAll(".table-wrapper .row");

        for(var i = 0; i < this.employees.length; i++){
            var nameColumn = (this.employees[i].fullname).toLowerCase();
            if(nameColumn.indexOf(word) != -1){
                rows[i].style.display = "table-row";
            }else{
                rows[i].style.display = "none";
            }
        }
    };

    //TODO: setTimeout +  publish/subscriber pattern

    searchApp.prototype.addEventOnSearch = function(){
        var searchField = document.querySelectorAll(".select-filter-by"),
            self = this;

        for(var item = 0; item < searchField.length; item++){
            searchField[item].addEventListener("keyup", function(){
                var value = searchField[0].value;
                self.filterItem(value);
            });
        }
    };
    return searchApp;
})();

myApp.myInstances = new myApp.search();
