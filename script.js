import { quizItems, quizDetails } from "./catholic-quiz.js";

// Quiz App by Ryan Macalandag 25/07/2023

// DOM elements
const appContainer = document.getElementById('app');
const pageNumber = document.getElementById('page-number');
const headerTitle = document.getElementById('header-title');
const questionContainer = document.getElementById('question-container');
const question = document.getElementById('question');
const answersContainer = document.getElementById('answers-container');
const nextButton = document.getElementById('next-button');

// DOM miscellaneous elements
const menuToggle = document.getElementById('menu-toggle');
const menuContainer = document.getElementById('menu-container');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const copyrightYear = document.getElementById('year');

const answersArray = quizItems || [];
const totalQuestions = answersArray.length;
let currenQuestionIndex = 0;
let currentScore = 0;
const userAnswers = [];

console.log(answersArray)

document.title = quizDetails.title;

// START quiz
function quizStart() {
    currenQuestionIndex = 0;
    currentScore = 0;
    showQuestion();
}

// RENDER question
function showQuestion() {

    let currentQuestion = quizItems[currenQuestionIndex].question;
    let currentQuestionNumber = currenQuestionIndex + 1;
    
    // hide next button until an answer is clicked
    nextButton.classList.add('hide');

    // clear answers container
    answersContainer.innerHTML = "";
    answersContainer.classList.remove('show');

    // clear next button
    nextButton.classList.add('hide');
    nextButton.removeEventListener('click', quizStart);
    
    // fill next button text
    nextButton.textContent = 'Next';

    // render page header
    pageNumber.textContent = currentQuestionNumber + ' of ' + totalQuestions;
    headerTitle.textContent = quizDetails.title;

    // render current question
    question.textContent = currentQuestionNumber + '. ' + currentQuestion;

    // get current answers
    const currentAnswersArray = quizItems[currenQuestionIndex].answers;
    currentAnswersArray.forEach((answer) => {
        // create answer button element
        const answerButton = document.createElement('button');
        answerButton.classList.add('answer');
        answerButton.classList.add(answer.correct);
        answerButton.textContent = answer.text;
        answerButton.dataset.correct = answer.correct;

        // insert into answers container
        answersContainer.appendChild(answerButton);
    })

    // add click listener for answers container
    answersContainer.addEventListener('click', checkAnswer);

    // arm click listener for next button
    nextButton.addEventListener('click', nextQuestion);

}

// SHOW scores
function showScores() {
    console.log('final slide')

    // render final header
    pageNumber.textContent = 'FINAL SCORE';
    
    // render final header
    question.textContent = 'You\'ve scored ' + currentScore + ' out of ' + totalQuestions + '! Do you want to do it again? ';

    // clear questions
    answersContainer.innerHTML = '';

    // show restart quiz button
    nextButton.textContent = 'Retake quiz!'
    nextButton.addEventListener('click', quizStart);
    
}

// ARM answers
function checkAnswer(e) {
    // disable click
    answersContainer.removeEventListener('click', checkAnswer);
    
    // show true/false answers
    answersContainer.classList.add('show');

    // mark selection
    e.target.classList.add('selected');

    // save answer to userAnswers array
    userAnswers.push(e.target.textContent);

    // update current score
    if (e.target.dataset.correct === 'true') {
        currentScore++;
    }

    // show next button
    nextButton.classList.remove('hide');
}
    
// ARM next button
function nextQuestion() {
    currenQuestionIndex++;
    nextButton.removeEventListener('click', nextQuestion);
    console.log(currenQuestionIndex)
    console.log(totalQuestions)
    if (currenQuestionIndex < totalQuestions) {
        console.log('show question')
        showQuestion();
    } else {
        console.log('show scores')
        showScores();
    }
    
}

// START 
quizStart();

// -----------------
// Miscellaneous features

// Dropdown menu
// menuToggle.addEventListener('click', () => {
//     menuContainer.classList.toggle('active');
//     menuToggle.classList.toggle('active');
// })

// Switch to dark mode
// darkModeToggle.addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// })

// Get current year
copyrightYear.textContent = new Date().getFullYear();