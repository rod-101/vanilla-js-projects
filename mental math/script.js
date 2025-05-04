let correctAnswer = 0;
let headContainer = document.getElementById('head-container');

let keys = document.getElementsByClassName('key');
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
    //a session has 10 successive problems
    let loop = 10;
    correctAnswer = createOneDigitProblem();

    //the 'enter' key is used to check the answer
    //it is also used to update the loop and give feedback to user
    document.getElementById('enter').addEventListener('click', () => {
        let userAnswer = document.getElementById('head-container').innerHTML;
        if(userAnswer == correctAnswer) {
            loop--;
            if(loop === 0) {
                return;
            }
            correctAnswer = createOneDigitProblem();
            headContainer.innerHTML = '';
        } else {
            console.log(userAnswer + " is wrong.")
        }
    })
}

// function enter() {
//     let userAnswer = document.getElementById('problem').innerHTML;
//     if(userAnswer == correctAnswer) {
//         console.log(userAnswer + ' is correct!');
//         return true;
//     } 
    
// }