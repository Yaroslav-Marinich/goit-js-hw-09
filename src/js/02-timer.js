import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.getElementById('datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let startTimer = 0;
let timerId = null;

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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }

    startTimer = selectedDates[0].getTime();
    refs.button.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

refs.button.setAttribute('disabled', 'disabled');
refs.button.addEventListener('click', () => {
  if (timerId) return;

  start();
});

function start() {
  intervalId = setInterval(() => {
    const arrayTime = startTimer - Date.now();
      const { days, hours, minutes, seconds } = convertMs(arrayTime);
       if (convertMs(arrayTime) === 0) {
         clearInterval(intervalId);
       }
    console.log({ days, hours, minutes, seconds });
      render({ days, hours, minutes, seconds });
     
  }, 1000);
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function render({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
}
