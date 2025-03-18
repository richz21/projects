let userScore = 0;
let compScore = 0;

let compChoiceTxtDisp = document.querySelector("#botchoice");
let compChoiceImgDisp = document.querySelector("#comp-img");
let userScoreDisp = document.querySelector("#user-score");
let compScoreDisp = document.querySelector("#comp-score");
let resultMsg = document.querySelector("#msg");
const choices = document.querySelectorAll(".choice");

const genCompChoice = () => {
  const options = ["Rock", "Paper", "Scissors"];
  return options[Math.floor(Math.random() * 3)];
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  compChoiceTxtDisp.innerText = `Bot has chosen ${compChoice}.`;
  compChoiceImgDisp.innerHTML = document
    .querySelector(`#${compChoice}`)
    .innerHTML.match(/[^>]*>/);

  if (userChoice == compChoice) {
    resultMsg.innerText = "It is a tie.";
    resultMsg.style.color = "#12355b";
  } else if (userChoice == "Rock") {
    if (compChoice == "Paper") {
      compScore++;
      resultMsg.innerText = "You Lose. Bot's Paper covers your Rock.";
      resultMsg.style.color = "#a00300";
    } else {
      userScore++;
      resultMsg.innerText = "You Win. Your Rock crushes Bot's Paper.";
      resultMsg.style.color = "green";
    }
  } else if (userChoice == "Paper") {
    if (compChoice == "Scissors") {
      compScore++;
      resultMsg.innerText = "You Lose. Bot's Scissors cut your Paper.";
      resultMsg.style.color = "#a00300";
    } else {
      userScore++;
      resultMsg.innerText = "You Win. Your Paper covers Bot's Rock.";
      resultMsg.style.color = "green";
    }
  } else {
    if (compChoice == "Rock") {
      compScore++;
      resultMsg.innerText = "You Lose. Bot's Rock crushes your Scissors.";
      resultMsg.style.color = "#a00300";
    } else {
      userScore++;
      resultMsg.innerText = "You Win. Your Scissors cut Bot's Paper.";
      resultMsg.style.color = "green";
    }
  }
  userScoreDisp.innerText = `${userScore}`;
  compScoreDisp.innerText = `${compScore}`;
};
choices.forEach((choice) => {
  choice.addEventListener("mouseenter", () => {
    choice.style.boxShadow = "0 1px 10px 1px rgba(0, 0, 0, 0.7)";
    choice.style.color = window.getComputedStyle(choice).backgroundColor;

    choices.forEach((otherChoice) => {
      if (otherChoice !== choice) {
        otherChoice.style.filter = "blur(2px)";
      }
    });
  });

  choice.addEventListener("mouseleave", () => {
    choice.style.boxShadow = "none";
    choice.style.color = "#e7f0fa";

    choices.forEach((otherChoice) => {
      otherChoice.style.filter = "none";
    });
  });

  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
