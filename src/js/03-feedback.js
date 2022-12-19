import throttle from 'lodash.throttle';

const feedbackFormState = {};

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(storageUpdate, 500));
formRef.addEventListener('submit', handleSubmitForm);

storageStatusCheck();

function storageStatusCheck() {
  const currentValue = getFormCurrentValue();

  if (currentValue?.email) {
    formRef.email.value = currentValue.email;
  }

  if (currentValue?.message) {
    formRef.message.value = currentValue.message;
  }

  return;
}

function storageUpdate(event) {
  if (event.target.name === 'email') {
    feedbackFormState.email = `${event.target.value}`;

    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(feedbackFormState)
    );
  }

  if (event.target.name === 'message') {
    feedbackFormState.message = `${event.target.value}`;

    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(feedbackFormState)
    );
  }

  return;
}

function handleSubmitForm(event) {
  event.preventDefault();

  clearFormDataStorage();
  event.currentTarget.reset();

  console.log(feedbackFormState);
}

function getFormCurrentValue() {
  return JSON.parse(localStorage.getItem('feedback-form-state'));
}

function clearFormDataStorage() {
  if (localStorage.getItem('feedback-form-state')) {
    localStorage.removeItem('feedback-form-state');
  }
}
