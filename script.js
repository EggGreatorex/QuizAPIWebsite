const container = document.querySelector(".container");
const question = document.querySelector(".question");
const options = document.querySelector(".options");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");

let correctAnswerIndex = -1;

// Get the question from the API
async function getQuestion() {
  const APIurl = "https://opentdb.com/api.php?amount=1&type=multiple"; // URL for our api
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
  correctAnswerIndex = Math.floor(Math.random() * (incorrectAnswer.length + 1));  // This gets us a random index position to insert our  correct answer into

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



function checkAnswer(selectedOption) {
  console.log("Selected option:", selectedOption);
  console.log("Correct answer:", correctAnswerIndex + 1);

  // Disable all buttons
  btn1.disabled = true;
  btn2.disabled = true;
  btn3.disabled = true;
  btn4.disabled = true;

  // Compare selected option with correct answer index
  if (selectedOption === correctAnswerIndex + 1) {
    options.style.backgroundColor = "green";
    question.style.backgroundColor = "green";
    setTimeout(() => {
      // Re-enable all buttons
      enableButtons();
    }, 3000);
  } else {
    let correctButton = document.querySelector(`.btn${correctAnswerIndex + 1}`);
    correctButton.style.backgroundColor = "green";

    options.style.backgroundColor = "red";
    question.style.backgroundColor = "red";
    setTimeout(() => {
      correctButton.style.backgroundColor = "rgb(176, 86, 21)";
      // Re-enable all buttons
      enableButtons();
    }, 3000);
  }
}


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
