/*global console, myApp:true*/
myApp = myApp || {};

myApp.dataTable = (function () {
    "use strict";
    var editableTable = ".table-editable";

    var TableApp = function () {
        this.employees = JSON.parse(myApp.storageInstance.getDataFromStorage());
        this.init();
    };

    TableApp.prototype.init = function () {
        this.bindEvents();
    };

    TableApp.prototype.bindEvents = function () {
        this.generateTable(this.employees);
        this.makeTableEditable(editableTable);
    };

    TableApp.prototype.createListTools = function () {
        var listRoot = document.createElement("ul"),
            firstListItem = document.createElement("li"),
            secondListItem = document.createElement("li"),
            lastListItem = document.createElement("li"),
            aLink = document.createElement("a"),
            saveButton = document.createElement("input");

        saveButton.type = "button";
        saveButton.className = "save-row";
        saveButton.value = "Save";

        aLink.setAttribute("href", "#");

        firstListItem.className = "edit-employee-list";
        secondListItem.className = "collapse-employee-list";

        firstListItem.appendChild(aLink);
        secondListItem.appendChild(aLink.cloneNode(true));
        lastListItem.appendChild(saveButton);

        listRoot.appendChild(firstListItem);
        listRoot.appendChild(secondListItem);
        listRoot.appendChild(lastListItem);

        return listRoot;
    };

    TableApp.prototype.generateTable = function(dataObject) {
        var table = document.querySelectorAll(".table-wrapper"),
            self = this;

        for(var i = 0; i < table.length; i++) {
            for(var index in dataObject){
                var list = self.createListTools(),
                    row = document.createElement("div");

                row.className = "row";
                row.setAttribute("data-table-row", index);

                for(var employeeObject in dataObject[index]) {
                    var column = document.createElement("span");
                    var spanValue = dataObject[index][employeeObject];
                    column.innerHTML = spanValue;
                    column.setAttribute("data-editable", "");
                    row.appendChild(column);
                    row.appendChild(list);
                }
                table[i].appendChild(row);
            }
        }
    };

    TableApp.prototype.makeTableEditable = function(dataTable) {
        var editableSpans = document.querySelectorAll(dataTable + " [data-editable]");

        for(var i = 0; i < editableSpans.length; i++) {
            var myInput = document.createElement('input'),
                columnParent = editableSpans[i].parentElement;

            myInput.type = "text";
            myInput.textContent = editableSpans[i].innerText;
            myInput.value = editableSpans[i].innerText;
            myInput.className = 'editable-input';

            columnParent.insertBefore(myInput,editableSpans[i]);
            editableSpans[i].remove();
        }
    };

    TableApp.prototype.addNewRow = function() {
        var table = document.querySelector(".table-editable"),
            row = document.createElement("div"),
            list = this.createListTools();

        row.className = "row";
        row.setAttribute("data-table-row",this.employees.length);
        table.appendChild(row);

        for(var index in this.employees[0]) {
            var myInput = document.createElement("input");
            myInput.type = "text";
            row.appendChild(myInput);
        }
        row.appendChild(list);
    };

    TableApp.prototype.saveNewRow = function(ev) {
        var header = [],
            table = document.querySelectorAll(".table-header"),
            columns = table[1].getElementsByTagName("span"),
            parent = ev.target.parentElement.parentElement.parentElement,
            allInputs = parent.querySelectorAll("input[type = 'text']");

        for(var i = 0; i < columns.length; i++) {
            var headerAttribute = columns[i].getAttribute("data-key-id");
            header.push({keyId:headerAttribute});
        }

        var newObject = {};

        for(var index = 0; index < header.length; index++) {
            var key = header[index].keyId;
            newObject[key] = allInputs[index].value;
        }

        this.employees.push(newObject);
        localStorage.setItem("dataObject", JSON.stringify(this.employees));
        location.reload();
    };

    TableApp.prototype.deleteRow = function(ev) {
        var parent = ev.target.parentElement.parentElement.parentElement,
            parentAttribute = parent.getAttribute("data-table-row");

        for(var i = 0; i < this.employees.length; i++) {
            if(parentAttribute == i){
                this.employees.splice(i);
            }
        }
        localStorage.setItem("dataObject", JSON.stringify(this.employees));
        location.reload();
    };

    return TableApp;
}());

myApp.tableInstance = new myApp.dataTable();

var addNewRow = document.querySelector(".add-row"),
    deleteRow = document.querySelectorAll(".collapse-employee-list a");

myApp.pubSub.listen("addNewRowEvent", myApp.tableInstance.addNewRow);
myApp.pubSub.listen("saveRowEvent", myApp.tableInstance.saveNewRow);
myApp.pubSub.listen("deleteRowEvent", myApp.tableInstance.deleteRow);

addNewRow.addEventListener("click", function () {
    "use strict";
    myApp.pubSub.fire("addNewRowEvent", "", "", myApp.tableInstance);
});

var editableTable = document.querySelector('.table-editable');

editableTable.addEventListener("click", function (e) {
    "use strict";
    if(e.target.classList.contains("save-row")){
        myApp.pubSub.fire("saveRowEvent", e, "", myApp.tableInstance);
    }
});

for(var i = 0; i < deleteRow.length; i++){
    deleteRow[i].addEventListener("click", function(e) {
        "use strict";
        myApp.pubSub.fire("deleteRowEvent", e, "", myApp.tableInstance);
    });
}


