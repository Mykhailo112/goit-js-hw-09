import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDatePicker = document.getElementById('datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const daysEl=document.querySelector('span[data-days]');
const hoursEl=document.querySelector('span[data-hours]');
const minutesEl=document.querySelector('span[data-minutes]');
const secondsEl=document.querySelector('span[data-seconds]');

let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      currentDifferenceDate(selectedDates[0]);
    },
  };

  function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

startBtn.setAttribute('disabled',true)

flatpickr(inputDatePicker, options);

startBtn.addEventListener('click',onStartBtn)

 function onStartBtn() {
  timerId = setInterval(startTimer,1000)
};

function currentDifferenceDate (selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    startBtn.setAttribute('disabled',true)
    return Notify.failure('Please choose a date in the future');
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
startBtn.removeAttribute('disabled');
}

function startTimer () {
  startBtn.setAttribute('disabled', true);
  inputDatePicker.setAttribute('disabled', true);

timeDifference -= 1000;

if (secondsEl.textContent <=0 && minutesEl.textContent <= 0) {
  Notify.success('Time end')
  clearInterval(timerId)
} else {
  formatDate=convertMs(timeDifference);
  renderDate(formatDate);
}};

function renderDate(formatDate) {
  secondsEl.textContent = formatDate.seconds;
  minutesEl.textContent = formatDate.minutes;
  hoursEl.textContent = formatDate.hours;
  daysEl.textContent = formatDate.days;
}