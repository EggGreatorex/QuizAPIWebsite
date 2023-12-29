const container = document.querySelector(".container");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");

// STARTING VARIABLES
let alreadyAdded = false; // THIS IS USED TO MAKE SURE OUR SCORE IS ONLY INCREASED BY 1 IF THE USER GETS THE QUESTION CORRECT
let alreadyIncreasedRound = false;
let correctAnswerIndex = -1;
let correctAnswerCount = 0;
let roundCount = 0;
let maxRound = 5;


function resetColours() {
  // RESET BUTTON STYLING
  btn1.style.backgroundColor = "rgb(176, 86, 21)";
  btn2.style.backgroundColor = "rgb(176, 86, 21)";
  btn3.style.backgroundColor = "rgb(176, 86, 21)";
  btn4.style.backgroundColor = "rgb(176, 86, 21)";
}


function startRound(){
  if (roundCount === maxRound){
    console.log(`your score: ${correctAnswerCount}`)
    displayResults();
  } else{
    alreadyAdded = false;
    alreadyIncreasedRound = false;
    getQuestion();
  };
};


function getApiUrl(){
  let APIurl = '';
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category').toLowerCase();
  console.log(category)

  if(category === 'default'){
    url = "https://opentdb.com/api.php?amount=1&type=multiple";
  } else if(category === 'animals'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=27&type=multiple";

  } else if(category === 'art'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=25&type=multiple";
  
  } else if(category === 'history'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=23&type=multiple";
  
  } else if(category === 'sports'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=21&type=multiple";
    
  } else if(category === 'videogames'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=15&type=multiple";

  } else if(category === 'computers'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=18&type=multiple";

  } else if(category === 'vehicles'){
    url =
      "https://opentdb.com/api.php?amount=1&difficulty=easy&category=28&type=multiple";
  }
 return url
};


// Get the question from the API
async function getQuestion() {
  resetColours();
  enableButtons();
  APIurl = getApiUrl();
  const result = await fetch(`${APIurl}`); // Attempts to fetch the api data
  const data = await result.json(); // We put the results into a json file
  displayQuestion(data.results[0]);
}

function displayQuestion(data) {
  options.style.backgroundColor = "rgb(26, 26, 26)";
  question.style.backgroundColor = "rgb(26, 26, 26)";
  let correctAnswer = data.correct_answer;
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  correctAnswerIndex = Math.floor(Math.random() * (incorrectAnswer.length + 1)); // This gets us a random index position to insert our  correct answer into

  optionsList.splice(correctAnswerIndex, 0, correctAnswer); // This inserts our correctAnswer into our generated index. Parameter of 0 is used to say we are not deleting any values.

  question.innerHTML = `${data.question}`;

  options.innerHTML = optionsList
    .map(
      (option, index) => `
        <li data-option="${index + 1}"> ${
        index + 1
      }| <span>${option}</span> </li>
    `
    )
    .join("");

  // Assign click event listeners to buttons
  btn1.addEventListener("click", () => checkAnswer(1)); // Listens for a click from each user
  btn2.addEventListener("click", () => checkAnswer(2));
  btn3.addEventListener("click", () => checkAnswer(3));
  btn4.addEventListener("click", () => checkAnswer(4));
}


function displayResults(){
  // Pass the score as paramter to our results html file
  window.location.href = `results.html?score=${correctAnswerCount}`;
};


function checkAnswer(selectedOption) {
  // Disable all buttons
  btn1.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  btn4.disabled = true;


  // Compare selected option with correct answer index
  if (selectedOption === correctAnswerIndex + 1) {
    increaseScore();
    alreadyAdded = true;
    options.style.backgroundColor = "green";
    question.style.backgroundColor = "green";
  } else {
    let correctButton = document.querySelector(`.btn${correctAnswerIndex + 1}`);
    correctButton.style.backgroundColor = "green";

    options.style.backgroundColor = "red";
    question.style.backgroundColor = "red";
  }

  increaseRoundCount();
  alreadyIncreasedRound = true;
}


// FUNCTION TO INCREASE THE SCORE IF THE USER GETS AN ANSWER CORRECT
function increaseScore(){
  // MAKE SURE WE ONLY INCREASE THE SCORE BY 1
  if (alreadyAdded === false){
      correctAnswerCount += 1;
  }
};

function increaseRoundCount(){
  if(alreadyIncreasedRound === false){
      roundCount += 1; // INCREASE THE ROUND COUNT BY 1
      console.log(`round number: ${roundCount}`);
  };
};

// Function to re-enable all buttons
function enableButtons() {
  btn1.disabled = false;
  btn2.disabled = false;
  btn3.disabled = false;
  btn4.disabled = false;
}

document.addEventListener("DOMContentLoaded", function () {
  getQuestion();
});

// FUNCTION TO RETURN TO HOME PAGE
function goHome() {
  window.location.href = "index.html";
};
