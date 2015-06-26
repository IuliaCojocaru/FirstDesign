'use strict';

function populateTable(){

    var elementFromHTML = document.getElementsByClassName("name-column")[0];
    console.log(elementFromHTML);
    var elem = elementFromHTML.getAttribute("data-column-type");
    console.log(elem);

    var res = elem.replace("-column", "");

    for(var index in employees){
        for(var obj in employees[index]){
              if(obj.indexOf(res) >= 0){
                  console.log("ok");
                  document.getElementsByClassName('name-column')[index].innerHTML = employees[index].fullname;
                  document.getElementsByClassName('job-column')[index].innerHTML = employees[index].jobtitle;
                  document.getElementsByClassName('grade-column')[index].innerHTML = employees[index].grade;
                  document.getElementsByClassName('status-column')[index].innerHTML = employees[index].allocationstatus;
                  document.getElementsByClassName('project-column')[index].innerHTML = employees[index].project;
                  document.getElementsByClassName('booking-column')[index].innerHTML = employees[index].dateofbooking;
              }
        }
    }
}

populateTable();

console.log("-----------------");

function populateTable2(){
    var matches = document.getElementById("table-wrapper").querySelectorAll("span");
    console.log(matches);
    console.log("-------------------");
    var elementFromHTML = "";
    var res = "";

    for(var index in matches){
        {
            elementFromHTML = document.getElementsByClassName(matches[index].className)[0];
            console.log("Element from html:", elementFromHTML);

            var elem = elementFromHTML.getAttribute("data-column-type");

            console.log("Elem by attribute:" ,elem);

            res = elem.replace("-column", "");

           /* for(var index in employees) {
                for (var obj in employees[index]) {
                    if (obj.indexOf(res) >= 0) {

                    }
                }
            }*/
        }

    }

}


populateTable2();
