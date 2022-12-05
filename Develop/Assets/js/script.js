//Initializing query selectors
const currDayEl = $("#currentDay");
const saveBtnEl = $('.saveBtn');

//Defining an array to base local storage off of, and creating the local storage variable if it does not exist
let savedData = ["", "", "", "", "", "", "", "", ""];

if(localStorage.getItem('savedText')){
    console.log('here');
    savedData = JSON.parse(localStorage.getItem('savedText'));
} else {
    localStorage.setItem('savedText', JSON.stringify(savedData));
}

function setCurrDate() { //setting the Date in header
    let currDay = moment().get().format("dddd, MMMM Do");
    console.log(currDay);
    currDayEl.html(currDay);
}

function updateHour() { //updating the current hour marker and the past/future classes
    let currHour = moment().get().hour();
    for(let i = 9; i<18;i++){
        if(currHour > 8 && currHour < 18){
            let tempEl = $(`#${i}`);
            if(i < currHour){
                tempEl.addClass("past");
                tempEl.removeClass("present");
                tempEl.removeClass("future");
            } else if(i == currHour){
                tempEl.removeClass("past");
                tempEl.addClass("present");
                tempEl.removeClass("future");
            } else {
                tempEl.removeClass("past");
                tempEl.removeClass("present");
                tempEl.addClass("future");
            }
        }
    }
}

function saveText() { //saving input text to local storage
    let textEl = $(this).parent().siblings("textarea");
    let selDay = textEl.attr("id") - 9;

    let workingList = JSON.parse(localStorage.getItem('savedText'));

    workingList[selDay] = textEl.val();
    
    localStorage.setItem('savedText', JSON.stringify(workingList));
}  

function updateText() { //populating the fields with data stored in local storage
    let workingList = JSON.parse(localStorage.getItem('savedText'));
    let textareaEls = $('textarea');
    for(let i = 0; i < 9; i++){
        textareaEls[i].innerText = workingList[i];
    }
}
//event listiner for the dave buttons
saveBtnEl.click(saveText);

setCurrDate();
updateHour();
updateText();