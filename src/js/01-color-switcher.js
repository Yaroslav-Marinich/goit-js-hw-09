function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
stopBtn.setAttribute('disabled', 'disabled');

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const hexColor = getRandomHexColor();
    document.querySelector('body').style.backgroundColor = hexColor;
    startBtn.setAttribute('disabled', 'disabled');
    stopBtn.removeAttribute('disabled');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'disabled');
});
