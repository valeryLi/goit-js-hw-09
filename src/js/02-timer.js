import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix, { Notify } from 'notiflix';

let selectedDateByUser = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;

    selectedDateByUser = selectedDates[0];
    return selectedDateByUser;
  },
};

const refs = {
  input: document.querySelector('input'),
  startBtn: document.querySelector('button'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', countdownTimer);

function countdownTimer() {
  timerId = setInterval(() => {
    const timer = selectedDateByUser - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timer);
    console.log(convertMs(timer));

    refs.daysSpan.textContent = addLeadingZero(days);
    refs.hoursSpan.textContent = addLeadingZero(hours);
    refs.minutesSpan.textContent = addLeadingZero(minutes);
    refs.secondsSpan.textContent = addLeadingZero(seconds);

    if ((days, hours, minutes, seconds <= 0)) {
      return clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
