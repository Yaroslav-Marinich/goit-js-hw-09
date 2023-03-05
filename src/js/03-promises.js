import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((fulfill, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

form.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();

let firstDelay = event.currentTarget.delay.value;
  let stepValue = event.currentTarget.step.value;
  let amountValue = event.currentTarget.amount.value;

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, stepValue * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
event.currentTarget.reset()
}
