/**
 * Created by icojocaru on 7/8/2015.
 */

myApp = myApp || {};

myApp.storageData = (function(){
    "use strict";
    var storageApp = function(){
        this.employees = myApp.employees;//this.getDataFromStorage();//
        this.init();
    };

    storageApp.prototype.init = function(){
        this.bindEvents();
    };

    storageApp.prototype.bindEvents = function(){
        this.storeData();
        this.getDataFromStorage();
    };

    storageApp.prototype.storeData = function(){
        if(localStorage.length === 0){
            localStorage.setItem("dataObject", JSON.stringify(this.employees));
        }
    };

    storageApp.prototype.getDataFromStorage = function(){
        return localStorage.getItem("dataObject");
    };

    return storageApp;
}());

myApp.storageInstance = new myApp.storageData();
