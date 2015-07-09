var myApp = myApp || {};

myApp.dataTable= (function(){
    "use strict";
    var editableTable = ".table-editable",
        myDataFromStorage = myApp.storageInstance.getDataFromStorage();

    var tableApp = function(){
        this.employees = JSON.parse(myDataFromStorage);
        console.log(this.employees);
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
        var listRoot = document.createElement("ul"),
            firstListItem = document.createElement("li"),
            lastListItem = document.createElement("li"),
            aLink = document.createElement("a"),
            saveButton = document.createElement("input");

        saveButton.type = "button";
        saveButton.className = "save-row";
        saveButton.value = "Save";

        aLink.setAttribute("href", "#");

        firstListItem.className = "edit-employee-list";
        lastListItem.className = "collapse-employee-list";

        firstListItem.appendChild(aLink);
        lastListItem.appendChild(aLink.cloneNode(true));

        listRoot.appendChild(firstListItem);
        listRoot.appendChild(lastListItem);
        listRoot.appendChild(saveButton);

        return listRoot;
    };

    tableApp.prototype.generateTable = function(dataObject){
        var table = document.querySelectorAll(".table-wrapper"),
            self = this;

        for(var i = 0; i < table.length; i++){
            for(var index in dataObject){
                var list = self.createListTools(),
                    row = document.createElement("div");

                row.className = "row";
                row.setAttribute("data-table-row", index);

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
            var myInput = document.createElement('input'),
                columnParent = editableSpans[i].parentElement;

            myInput.type = "text";
            myInput.textContent = editableSpans[i].innerText;
            myInput.value = editableSpans[i].innerText;

            columnParent.insertBefore(myInput,editableSpans[i]);
            editableSpans[i].remove();
        }
    };

    tableApp.prototype.addNewRow = function(){
        var table = document.querySelector(".table-editable"),
            row = document.createElement("div"),
            list = this.createListTools();

        row.className = "row";
        row.setAttribute("data-table-row",this.employees.length);
        table.appendChild(row);

        for(var index in this.employees[0]){
            var myInput = document.createElement("input");
            myInput.type = "text";
            row.appendChild(myInput);
        }
        row.appendChild(list);
    };

    tableApp.prototype.saveNewRow = function(ev){
        var header = [],
            table = document.querySelectorAll(".table-header"),
            columns = table[1].getElementsByTagName("span"),
            tableRows = document.querySelector(".table-editable"),
            lastColumn = tableRows.lastElementChild,
            parent = ev.target.parentElement.parentElement,
            allInputs = parent.querySelectorAll("input[type = 'text']");

        for(var i = 0; i < columns.length; i++){
            var headerAttribute = columns[i].getAttribute("data-key-id");
            header.push({keyId:headerAttribute});
        }

        var newObject = {};

        for(var index = 0; index < header.length; index++){
            var key = header[index].keyId;
            console.log(key)
            newObject[key] = allInputs[index].value;
        }

        this.employees.push(newObject);
        localStorage.setItem("dataObject", JSON.stringify(this.employees));
    };

    return tableApp;
})();

myApp.tableInstance = new myApp.dataTable();

var addNewRow = document.querySelector(".add-row");

myApp.pubSub.listen("addNewRowEvent", myApp.tableInstance.addNewRow);
myApp.pubSub.listen("saveRowEvent", myApp.tableInstance.saveNewRow);

addNewRow.addEventListener("click", function(){
    myApp.pubSub.fire('addNewRowEvent', '', '', myApp.tableInstance);
});

var editableTable = document.querySelector('.table-editable');

editableTable.addEventListener('click', function (e){
    if(e.target.classList.contains('save-row')){
        myApp.pubSub.fire("saveRowEvent", e, '', myApp.tableInstance);
    }
});

