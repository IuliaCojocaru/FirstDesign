/**
 * Created by icojocaru on 7/3/2015.
 */

myApp = myApp || {};

//TODO: setTimeout +  publish/subscriber pattern

myApp.search = (function(){
    "use strict";
    var loadingElement = document.querySelector(".loading");

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

    searchApp.prototype.filterHeader = function(item) {
        var tableHeader = document.querySelector(".table-header"),
            column = tableHeader.getElementsByTagName("span"),
            rows = document.querySelectorAll(".table-search .row"),
            searchedWord = item.toLocaleLowerCase().trim().replace(/ +/g, "").split(":"),
            foundColumn;

        for (var index = 0; index < this.employees.length; index++){
            var currentColumn = column[index].textContent.toLowerCase().trim().replace(/ +/g, "");
            if(currentColumn.indexOf(searchedWord[0]) != -1) {
                foundColumn = column[index];
            }
            else{
                alert(" Column with the inserted item not found, please insert a valid column!");
                break;
            }
            if(foundColumn){
                this.showLoadingImage();
                this.hideLoadingImage();
                foundColumn.style.backgroundColor = "red";
                for (var i = 0; i < this.employees.length; i++){
                    if (this.employees[i][currentColumn].toLowerCase().indexOf(searchedWord[1]) != -1){
                        rows[i].style.display = "table-row";
                    }
                    else{
                        rows[i].style.display = "none";
                    }
                }
                break;
            }
        }
    };

    searchApp.prototype.showLoadingImage = function(){
        loadingElement.style.display = "block";
    };

    searchApp.prototype.hideLoadingImage = function(){
        setTimeout(function(){
            loadingElement.style.display = "none";
        }, 1000);
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

    if(e.keyCode == 13){
//        myApp.pubSub.fire('customEvent', searchItem, 'fullname', myApp.myInstance);
        myApp.pubSub.fire('searchFilterEvent', searchItem, 'header', myApp.myInstance);
    }
});
