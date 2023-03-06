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

  let firstDelay = Number(event.currentTarget.delay.value);
  let stepValue = Number(event.currentTarget.step.value);
  let amountValue = event.currentTarget.amount.value;
  setTimeout(() => {
    for (let i = 1; i <= amountValue; i += 1) {
      createPromise(i, stepValue * i)
        .then(({ position, delay }) => {
          console
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay + firstDelay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay + firstDelay}ms`
          );
        });
    }
  }, firstDelay);
  event.currentTarget.reset();
}
