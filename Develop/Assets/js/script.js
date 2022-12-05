const currDayEl = $("#currentDay");
const saveBtnEl = $('.saveBtn');


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

function updateHour() {
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

function saveText() {
    console.log('saved');
    let textEl = $(this).parent().siblings("textarea");
    let selDay = textEl.attr("id") - 9;

    let workingList = JSON.parse(localStorage.getItem('savedText'));

    workingList[selDay] = textEl.val();
    
    localStorage.setItem('savedText', JSON.stringify(workingList));
}  

function updateText() {
    for(let i = 0; i < 9; i++){

    }
}

saveBtnEl.click(saveText);

setCurrDate();
updateHour();