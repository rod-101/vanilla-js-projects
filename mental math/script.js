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
            enterKey.style.pointerEvents = "none";
            deleteKey.style.pointerEvents = "none";
            clearTimeout(timerID);
            console.log("counter inside loop: " + counter);
            recordBestTime();
            document.getElementById('time').innerHTML = timer.innerHTML;
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
    //calculation of time
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

let bestTime = 0;
let bestTimeContainer = document.getElementById('bestTime');
function recordBestTime() {
    let seconds = 0;
    let minutes = 0;
    console.log("counter inside function: " + counter);
    let time = counter;

    if(bestTime == 0) {
        bestTimeContainer.innerHTML = `${time}`
        bestTime = time;
    } else {
        if(time < bestTime) { //there is a problem here
            bestTime = time;
        }
    
        //formatting the best time to be displayed on the dialog
        if (bestTime < 60) {
            seconds = bestTime;
        } else {
            seconds = bestTime % 60;
        }
        if(bestTime % 60 == 0){
            minutes = bestTime / 60;
        }

        //format of best time on screen
        if(seconds < 10) {
            bestTimeContainer.innerHTML = minutes + ':' + '0' + seconds;
        } else {
            bestTimeContainer.innerHTML = minutes + ':' + seconds;
        }        
    }
}