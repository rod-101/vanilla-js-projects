let loop = 0;
let sec = 0;
let min = 0;
let counter = -1;
let timerID;
let headContainer = document.getElementById('head-container');
let timer = document.getElementById('timer');
let keys = document.getElementsByClassName('key');
let enterKey = document.getElementById("enter");
let deleteKey = document.getElementById("delete");
let bestTime = 0; //stored as integer for simple comparison
let bestTimeContainer = document.getElementById('bestTimeContainer');
document.getElementById('enter').addEventListener('click', handleEnterClick)

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
            enterKey.style.pointerEvents = "none";
            deleteKey.style.pointerEvents = "none";
            clearTimeout(timerID);
            recordBestTime();
            document.getElementById('time').innerHTML = timer.innerHTML;
            counter = 0;
            min = 0;
            sec = 0;
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

function calculateSeconds(i) {
    let secs = 0;
    if (i < 60) {
        secs = i;
    } else {
        secs = i % 60;
    }    
    return secs;
}

function calculateMinutes(i) {
    let mins = 0;
    if(i % 60 == 0){
        mins = i / 60;
    }
    return mins;
}

function formatTimeAndDisplayTimer() {
    if(sec < 10) {
        timer.innerHTML = min + ':' + '0' + sec;
    } else {
        timer.innerHTML = min + ':' + sec;
    }
}

function formatTimeAndDisplayBestTime(seconds, minutes) {
    if(seconds < 10) {
        bestTimeContainer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        bestTimeContainer.innerHTML = `${minutes}:${seconds}`;
    }
}

function startTimer() {
    counter++;
    sec = calculateSeconds(counter);
    min = calculateMinutes(counter);
    formatTimeAndDisplayTimer();
    timerID = setTimeout(startTimer, 1000);
}

function recordBestTime() {
    let seconds = 0;
    let minutes = 0;

    //if there is previous record of bestTime
    if(bestTime > 0){
        if(counter < bestTime) {
            bestTime = counter;
        }
        seconds = calculateSeconds(bestTime);
        minutes = calculateMinutes(bestTime);
        formatTimeAndDisplayBestTime(seconds, minutes);        
    }
    
    //if no previous record of bestTime
    if(bestTime === 0) {
        if(sec < 10) {
            bestTimeContainer.innerHTML = `${min}:0${sec}`;
        } else {
            bestTimeContainer.innerHTML = `${min}:${sec}`;
        }
        bestTime = counter;
    }     
}