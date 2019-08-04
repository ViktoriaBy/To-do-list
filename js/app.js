// Select the Elements //

const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names

const CHECK= "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

//get item from localstorage

let data = localStorage.getItem("TODO");

// check if data isnt empty
 
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to user interface
}else {
    //if data isnt empty
    LIST = [];
    id = 0;
}

//load items to users interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);

        
    });
}

// clear local storage

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//Todays Date

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do's function

function addToDo(toDo, id, done, trash){
    
    if(trash){return;}

    const DONE = done ? CHECK: UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                        <li class= "item">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id ="${id}"></i>
                        </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


// Add item to the list when user enters KEY

document.addEventListener("keyup", function(even){
if(event.keyCode == 13){
    const toDo = input.value;

    //check input if isnt empty
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false,
        });
//add item to localstoragem( this code must be added to all updated list arrays)

localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;

    }
    input.value = "";
}
});

// complete to do's

function completeToDo(element){
element.classList.toggle(CHECK);
element.classList.toggle(UNCHECK);
element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);


LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do's

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;  
}

// target items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return clicked element in list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstoragem( this code must be added to all updated list arrays)

localStorage.setItem("TODO", JSON.stringify(LIST));
});