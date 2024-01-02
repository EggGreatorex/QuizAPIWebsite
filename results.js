function showResults(){
  // Get the score from the query parameter
  const urlParams = new URLSearchParams(window.location.search);
  let score = urlParams.get("score");

  // REMOVE CALCULATE RESULTS BUTTON
  const calcButton = document.querySelector(".calculateButton");
  calcButton.remove();

  // PLAY SOUND
  const drumRollSound = new Audio("./sounds/drumRoll.mp3");
  drumRollSound.play();

  // Display the initial message
  const resultsContainer = document.querySelector(".results");
  resultsContainer.innerHTML = `<p>Calculating score with giga mega brain...
  </p>`;

  // Delayed update after 2 seconds
  setTimeout(() => {
    resultsContainer.innerHTML = `<p>Your score: ${score}/5</p>`;
    drumRollSound.pause();
    drumRollSound.currentTime = 0;
  }, 4000);

  setTimeout(() => {
    // Get the integer version of the score
    score = parseInt(score, 10);
    if (score >= 0 && score <= 1) {
      const messageContainer = document.querySelector(".message");
      messageContainer.innerHTML = `<p>Wow you aren't very good at this!</p>`;
      const wahwahSound = new Audio("./sounds/wahwahwah.mp3");
      wahwahSound.play();
    } else if (1 <= score && score <= 3) {
      const messageContainer = document.querySelector(".message");
      messageContainer.innerHTML = `<p>Oh! What a shame. You almost did well.</p>`;
      const almostGood = new Audio("./sounds/almostGood.mp3");
      almostGood.play();
    } else if (4 <= score && score <= 5) {
      const messageContainer = document.querySelector(".message");
      messageContainer.innerHTML = `<p>I guess you deserve a congratulations.</p>`;
      const goodJobSound = new Audio("./sounds/goodjob.mp3");
      goodJobSound.play();
    }
  }, 4300);
};

// FUNCTION TO START THE GAME AGAIN
function playAgain(){
  window.location.href = "index.html";
}
