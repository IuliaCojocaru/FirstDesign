/**
 * Created by icojocaru on 7/8/2015.
 */

/*global myApp:true*/

myApp = myApp || {};

myApp.storageData = (function(){
    "use strict";
    var StorageApp = function(){
        this.employees = myApp.employees;
        this.init();
    };

    StorageApp.prototype.init = function(){
        this.bindEvents();
    };

    StorageApp.prototype.bindEvents = function(){
        this.storeData();
        this.getDataFromStorage();
    };

    StorageApp.prototype.storeData = function(){
        if(localStorage.length === 0){
            localStorage.setItem("dataObject", JSON.stringify(this.employees));
        }
    };

    StorageApp.prototype.getDataFromStorage = function(){
        return localStorage.getItem("dataObject");
    };

    return StorageApp;
}());

myApp.storageInstance = new myApp.storageData();
