/*global document*/
/*eslint-disable no-console*/
'use strict';

// build array of questions + answers
var answeredQuestions = [];
let score = 0;
let gameStarted = false;

function AnsweredQuestion(question, answera, answerb, answerc, answerd, correct, img) {
    this.question = question;
    this.answera = answera;
    this.answerb = answerb;
    this.answerc = answerc;
    this.answerd = answerd;
    this.correct = correct;
    this.img = img;
}

function addAnsweredQuestion(question, answera, answerb, answerc, answerd, correct, img) {
    var aq = new AnsweredQuestion(question, answera, answerb, answerc, answerd, correct, img);
    answeredQuestions.push(aq);
}

addAnsweredQuestion('What is the\ndiameter of\n the earth?', '40.000 km', '6.350 km', '12.700 km', '20.000 m', 'C', 'https://images.unsplash.com/photo-1680399524821-d4e6b225b0ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')
addAnsweredQuestion('What is the\ncapital\nof Canada?', 'Toronto', 'Ottawa', 'Montreal', 'Quebec', 'B', 'https://images.unsplash.com/photo-1551009175-15bdf9dcb580?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80');
addAnsweredQuestion('What is\ncos(π)?', '0', '-1', '+1', '1/2', 'B', 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWF0aGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60');
addAnsweredQuestion('What is the\ncapital\nof Australia?', 'Perth', 'Melbourne', 'Sydney', 'Canberra', 'D', 'https://images.unsplash.com/photo-1515861461225-1488dfdaf0a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
addAnsweredQuestion('Northern\nIreland\nbelongs to...?', 'England', 'Great Britain', 'the United\nKingdom', 'none of these', 'C', 'https://images.unsplash.com/photo-1654452530992-43c5a7c5ab37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
addAnsweredQuestion('... is not a\nneighbouring\ncountry of\nGermany.', 'Poland', 'Slovakia', 'Czechia', 'Luxembourg', 'B', 'https://images.unsplash.com/photo-1608817576203-3c27ed168bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZXVyb3BlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60');

// get DOM elements
var question = document.getElementById('question');
var answerA = document.getElementById('answer-a');
var answerB = document.getElementById('answer-b');
var answerC = document.getElementById('answer-c');
var answerD = document.getElementById('answer-d');
var answerBoardA = document.getElementById('answer-board-a');
var answerBoardB = document.getElementById('answer-board-b');
var answerBoardC = document.getElementById('answer-board-c');
var answerBoardD = document.getElementById('answer-board-d');
let scoreText = document.getElementById('score');
let quizzImg = document.getElementById('quiz-img');


// current question number;
var questNum = 0;
// board with correct answer
var rightAnswerBoard;

// assign the right answer board to the variable rightAnswerBoard
function setRightAnswer() {
    if (answeredQuestions[questNum].correct === 'A') {
        rightAnswerBoard = answerBoardA;
    } else if (answeredQuestions[questNum].correct === 'B') {
        rightAnswerBoard = answerBoardB;
    } else if (answeredQuestions[questNum].correct === 'C') {
        rightAnswerBoard = answerBoardC;
    } else if (answeredQuestions[questNum].correct === 'D') {
        rightAnswerBoard = answerBoardD;
    }
}

// default state at start / after a question was answered
function resetQuestions() {

    answerBoardA.setAttribute('color', '#555555');
    answerBoardB.setAttribute('color', '#555555');
    answerBoardC.setAttribute('color', '#555555');
    answerBoardD.setAttribute('color', '#555555');
    question.setAttribute('value', answeredQuestions[questNum].question);
    answerA.setAttribute('value', answeredQuestions[questNum].answera);
    answerBoardA.setAttribute('class', 'clickable');
    answerB.setAttribute('value', answeredQuestions[questNum].answerb);
    answerBoardB.setAttribute('class', 'clickable');
    answerC.setAttribute('value', answeredQuestions[questNum].answerc);
    answerBoardC.setAttribute('class', 'clickable');
    answerD.setAttribute('value', answeredQuestions[questNum].answerd);
    answerBoardD.setAttribute('class', 'clickable');
    const imgAttr = answeredQuestions[questNum].img
    console.log('imgAttr: ', imgAttr);
    quizzImg.setAttribute('src', imgAttr);
    setRightAnswer();
}

// check whether chosen board was correct and take appropriate actions
// board: chosen board
// c: chosen answer (A, B, C, D)
function checkAnswer(board, c) {
    answerBoardA.setAttribute('class', 'not-clickable');
    answerBoardB.setAttribute('class', 'not-clickable');
    answerBoardC.setAttribute('class', 'not-clickable');
    answerBoardD.setAttribute('class', 'not-clickable');
    if (c === answeredQuestions[questNum].correct) {
        board.setAttribute('color', 'green');
        score += 10;
    } else {
        board.setAttribute('color', 'red');
        rightAnswerBoard.setAttribute('color', 'blue');
        score -= 10;
    }
    // if questions are all done, delete answer boards
    if (questNum === answeredQuestions.length - 1) {
        question.setAttribute('value', 'Game Over');
        answerBoardA.setAttribute('visible', 'false');
        answerBoardB.setAttribute('visible', 'false');
        answerBoardC.setAttribute('visible', 'false');
        answerBoardD.setAttribute('visible', 'false');
    }
    else {
        questNum = (questNum + 1);
        scoreText.setAttribute('value', `Score: ${score}`);
        // 3 seconds delay before next question
        setTimeout(resetQuestions, 3000);
    }
}



function startGame() {
    // Initialization
    resetQuestions();
}

// add event listener for 'W' key keyup
document.addEventListener('keyup', function (event) {
    if (event.code === "KeyW") {
        if (!gameStarted) {
            startGame();
            gameStarted = true;
        }
    }
});


// Set up event handling

// answer boards react on click event
answerBoardA.addEventListener('click', function () {
    checkAnswer(answerBoardA, 'A');
});
answerBoardB.addEventListener('click', function () {
    checkAnswer(answerBoardB, 'B');
});
answerBoardC.addEventListener('click', function () {
    checkAnswer(answerBoardC, 'C');
});
answerBoardD.addEventListener('click', function () {
    checkAnswer(answerBoardD, 'D');
});


