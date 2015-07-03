var myApp = myApp || {};

//TODO: config file

myApp.dataTable= (function(){
    "use strict";
    var editableTable = ".table-editable";
    var tableApp = function(){
        this.employees = myApp.employees;
        this.init();
    };

    tableApp.prototype.init = function(){
        this.bindEvents();
    };

    tableApp.prototype.bindEvents = function(){
        this.generateTable(this.employees);
        this.makeTableEditable(editableTable);
    };

    tableApp.prototype.createListTools = function(){
        var listRoot = document.createElement("ul");
        var firstListItem = document.createElement("li");
        var lastListItem = document.createElement("li");

        var aLink = document.createElement("a");
        aLink.setAttribute("href", "#");

        firstListItem.className = "edit-employee-list";
        lastListItem.className = "collapse-employee-list";

        firstListItem.appendChild(aLink);
        lastListItem.appendChild(aLink.cloneNode(true));

        listRoot.appendChild(firstListItem);
        listRoot.appendChild(lastListItem);

        return listRoot;
    };

    tableApp.prototype.generateTable = function(dataObject){
        var table = document.querySelectorAll(".table-wrapper");
        var self = this;

        for(var i = 0; i < table.length; i++){
            for(var index in dataObject){
                var list = self.createListTools();
                var row = document.createElement("div");

                row.className = "row";

                for(var employeeObject in dataObject[index]){
                    var column = document.createElement("span");
                    var spanValue = dataObject[index][employeeObject];
                    column.innerHTML = spanValue;
                    column.setAttribute('data-editable', "");
                    row.appendChild(column);
                    row.appendChild(list);
                }
                table[i].appendChild(row);
            }
        }
    };

    tableApp.prototype.makeTableEditable = function(dataTable){
        var editableSpans = document.querySelectorAll(dataTable + " [data-editable]");

        for(var i = 0; i < editableSpans.length; i++){
            var myInput = document.createElement('input');
            myInput.type = "text";
            myInput.textContent = editableSpans[i].innerText;
            myInput.value = editableSpans[i].innerText;

            var columnParent = editableSpans[i].parentElement;
            columnParent.insertBefore(myInput,editableSpans[i]);
            editableSpans[i].remove();
        }
    };

    return tableApp;
})();

myApp.tableInstances = new myApp.dataTable();

