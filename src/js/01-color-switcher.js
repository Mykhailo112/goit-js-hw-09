const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
const bodyElem=document.querySelector('body');
let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

startBtn.addEventListener("click",playStart);

function playStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
  timerId = setInterval(() =>  bodyElem.style.backgroundColor = getRandomHexColor()
  , 1000);
    };

stopBtn.addEventListener("click", playStop);

function playStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true; 
     clearInterval(timerId);
 };


