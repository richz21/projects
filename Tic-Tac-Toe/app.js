let boxes = document.querySelectorAll(".box");
let play = document.querySelector(".resetbutn");
let turnHead = document.querySelector("h2");
let turn0 = true;
let count = 0;
const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.disabled = true;
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;

    if (turn0) {
      turn0 = false;
      turnHead.classList.remove("playero");
      turnHead.classList.add("playerx");
      turnHead.innerText = "Player X's turn";
      box.classList.add("playero");
      box.innerText = "O";
    } else {
      turn0 = true;
      box.classList.add("playerx");
      box.innerText = "X";
      turnHead.classList.remove("playerx");
      turnHead.classList.add("playero");
      turnHead.innerText = "Player O's turn";
    }
    box.disabled = true;
    checkWinner();
    if (count == 9) {
      turnHead.className = "";
      turnHead.style.fontSize = "6vmin";
      turnHead.innerText = "No Winners :(";
    }
  });
});

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxes[pattern[0]];
    let pos2 = boxes[pattern[1]];
    let pos3 = boxes[pattern[2]];
    if (pos1.innerText != "" && pos2.innerText != "" && pos3.innerText != "") {
      if (
        pos1.innerText == pos2.innerText &&
        pos2.innerText == pos3.innerText
      ) {
        pos1.classList.add("winner");
        pos2.classList.add("winner");
        pos3.classList.add("winner");
        turnHead.innerText = `Player ${pos3.innerText} has won !!!`;
        turnHead.classList.add("winner");
        play.innerText = "New Game";
        count = 0;
        boxes.forEach((box) => (box.disabled = true));
      }
    }
  }
};

play.addEventListener("click", () => {
  play.innerText = "Reset Game";
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.className = "box";
  });
  turnHead.className = "playero";
  turnHead.innerText = "Player O's Turn";
  turn0 = true;
  count = 0;
});
