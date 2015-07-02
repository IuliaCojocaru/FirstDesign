'use strict';

var myApp = myApp || {};

myApp.dataTable= (function(){

    var employees = myApp.employees;

    function init(){
        generateTable(employees);
    }

    function createListTools(){
        var listRoot = document.createElement("ul");
        var firstListItem = document.createElement("li");
        var lastListItem = document.createElement("li");

        var aLink = document.createElement("a");
        aLink.setAttribute("href", "#");

        firstListItem.appendChild(aLink);
        lastListItem.appendChild(aLink);

        firstListItem.className = "edit-employee-list";
        lastListItem.className = "collapse-employee-list";

        listRoot.appendChild(firstListItem);
        listRoot.appendChild(lastListItem);

        return listRoot;
    }

    function generateTable(dataObject){
        var table = document.querySelector(".table-wrapper");
        var list = createListTools();

        console.log(list);

        for(var index in dataObject){
            var row = document.createElement("div");
            row.className = "row";

            for(var employeeObject in dataObject[index]){
                var column = document.createElement("span");
                var spanValue = dataObject[index][employeeObject];
                column.innerHTML = spanValue;
                column.setAttribute('data-editable', true);
                row.appendChild(column);
        //        row.appendChild(list);
            }
            table.appendChild(row);
        }
    }

    function makeTableEditable(customTable){
        var editableSpans = document.querySelectorAll(customTable + " [data-editable]");

        for(var i = 0; i < editableSpans.length; i++){
            var myInput = document.createElement('input');
            myInput.type = "text";
            myInput.textContent = editableSpans[i].innerText;
            myInput.value = editableSpans[i].innerText;

            var parent = editableSpans[i].parentElement;
            parent.insertBefore(myInput,editableSpans[i]);
            editableSpans[i].remove();
        }
    }

    return{
        init: init,
        editTable: makeTableEditable
    };

})();

myApp.dataTable.init();
myApp.dataTable.editTable(".table-wrapper");

