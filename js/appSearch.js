/**
 * Created by icojocaru on 7/3/2015.
 */

/*global console,myApp:true*/

myApp = myApp || {};

myApp.search = (function () {
    "use strict";
    var loadingElement = document.querySelector(".loading");
    var myDataFromStorage = myApp.storageInstance.getDataFromStorage();

    var SearchApp = function () {
        this.employees = JSON.parse(myDataFromStorage);
    };

    SearchApp.prototype.init = function () {
        this.bindEvents();
    };

    SearchApp.prototype.bindEvents = function () {

    };

    SearchApp.prototype.filterHeader = function(item) {
        var tableHeader = document.querySelector(".table-header"),
            column = tableHeader.getElementsByTagName("span"),
            rows = document.querySelectorAll(".table-search .row"),
            searchedWord = item.toLocaleLowerCase().trim().split(":"),
            foundColumn,
            overlayElement = document.querySelector(".overlay");

        for (var index = 0; index < this.employees.length; index++) {
            var currentColumn = column[index].textContent.toLowerCase().trim().replace(/ +/g, "");
            if(currentColumn.indexOf(searchedWord[0]) !== -1) {
                foundColumn = column[index];
            }
            if(foundColumn && isItemValid(searchedWord[1])) {
                this.showLoadingImage();
                this.hideLoadingImage();
                foundColumn.style.backgroundColor = "red";
                for (var i = 0; i < this.employees.length; i++) {
                    if(this.employees[i][currentColumn].toLowerCase().indexOf(searchedWord[1]) !== -1) {
                        rows[i].style.display = "table-row";
                    }
                    else {
                        rows[i].style.display = "none";
                    }
                }
                break;
            }else {
                overlayElement.style.display = "block";
            }
        }
    };

    SearchApp.prototype.closeOverlay = function () {
        var overlayElement = document.querySelector(".overlay");
        overlayElement.style.display = "none";
    };

    function isItemValid(str) {
        var regex = new RegExp("^[a-zA-Z0-9/ ]*$");
        return regex.test(str);
    }

    SearchApp.prototype.showLoadingImage = function () {
        loadingElement.style.display = "block";
    };

    SearchApp.prototype.hideLoadingImage = function () {
        setTimeout(function () {
            loadingElement.style.display = "none";
        }, 1000);
    };

    return SearchApp;
}());


var searchField = document.querySelector(".select-filter-by"),
    myForm = document.querySelector(".employees-selection"),
    closeOverlay = document.querySelector(".overlay a");

myApp.myInstance = new myApp.search();
myApp.pubSub.listen("searchFilterEvent", myApp.myInstance.filterHeader);
myApp.pubSub.listen("closeOverlayEvent", myApp.myInstance.closeOverlay);

myForm.addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();
});

searchField.addEventListener("keyup", function (e) {
    "use strict";
    var searchItem = e.target.value;

    if(e.keyCode === 13) {
        myApp.pubSub.fire("searchFilterEvent", searchItem, "header", myApp.myInstance);
    }
});

closeOverlay.addEventListener("click", function () {
    "use strict";
    myApp.pubSub.fire("closeOverlayEvent", "", "", myApp.myInstance);
});
