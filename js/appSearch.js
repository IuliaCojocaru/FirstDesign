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
        this.addEventOnSearch();
    };

    searchApp.prototype.filterItem = function(item){
        var word = item.toLowerCase();
        var self = this;

        for(var index in self.employees){
            var nameColumn = self.employees[index].fullname;
            if(nameColumn.indexOf(word) >= 0)
                console.log(word, nameColumn);
        }
    };
    //TODO: setTimeout +  publish/subscriber pattern

    searchApp.prototype.addEventOnSearch = function(){
        var searchField = document.querySelectorAll(".select-filter-by");
        var rows = document.querySelectorAll(".row");
        var self = this;

        for(var item = 0; item < searchField.length; item++){
            searchField[item].addEventListener("keyup", function(){
                var value = searchField[0].value;
               // var columnFlirted =
                self.filterItem(value);

               // console.log(columnFlirted);
            });
        }
    };
    return searchApp;
})();

myApp.myInstances = new myApp.search();
