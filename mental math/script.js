let loop = 0;
let sec = 0;
let min = 0;
let timerID;
let headContainer = document.getElementById('head-container');
let timer = document.getElementById('timer');
let keys = document.getElementsByClassName('key');
let enterKey = document.getElementById("enter");
let deleteKey = document.getElementById("delete");

document.addEventListener("DOMContentLoaded", function () {
    enterKey.style.pointerEvents = "none"
    deleteKey.style.pointerEvents = "none"
})

Array.from(keys).forEach(el => {
    el.addEventListener('click', () => {
        headContainer.innerHTML += el.innerHTML;
    })
});

function deleteNum() {
    let str = headContainer.innerHTML;
    headContainer.innerHTML = str.slice(0, -1);
}

function createRandomNum(range, offset) {
    return Math.floor(Math.random() * range) + offset;
}

function createOneDigitProblem(loop) {
    let range = 9;
    let offset = 1;

    let operand1 = createRandomNum(range, offset);
    let operand2 = createRandomNum(range, offset);
    document.getElementById('problem').innerHTML = operand1 + ' x ' + operand2
    return operand1 * operand2;
}

function createSession() {
    loop = 5;
    startTimer();
    //enable and disable rightful keys
    enterKey.style.pointerEvents = "auto";
    deleteKey.style.pointerEvents = "auto";
    document.getElementById('start').disabled = true;
    correctAnswer = createOneDigitProblem();
}

function handleEnterClick() {
    let userAnswer = document.getElementById('head-container').innerHTML;
    if(userAnswer == correctAnswer) {
        loop--;
        console.log('tries left: ' + loop);
        if(loop < 1) {
            clearTimeout(timerID);
            document.getElementById('time').innerHTML = timer.innerHTML;
            enterKey.style.pointerEvents = "none";
            deleteKey.style.pointerEvents = "none";
            counter = 0;
            min = 0;
            headContainer.innerHTML = "";
            
            document.getElementById('scoreDialog').showModal();                
            return;
        }
        correctAnswer = createOneDigitProblem();
        headContainer.innerHTML = '';
    } else {
        console.log(userAnswer + " is wrong.")
    }
}

document.getElementById('enter').addEventListener('click', handleEnterClick)

let counter = 0;
function startTimer() {
    
    if (counter < 60) {
        sec = counter;
    } else {
        sec = counter % 60;
    }

    if(counter % 60 == 0){
        min = counter / 60;
    }

    //format of timer on screen
    if(sec < 10) {
        timer.innerHTML = min + ':' + '0' + sec;
    } else {
        timer.innerHTML = min + ':' + sec;
    }
    
    counter++;
    timerID = setTimeout(startTimer, 1000);
}