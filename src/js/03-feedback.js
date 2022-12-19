import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let feedbackFormState = {};

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(storageUpdate, 500));
formRef.addEventListener('submit', handleSubmitForm);

storageStatusCheck();

function storageStatusCheck() {
  const currentValue = getFormCurrentValue();

  if (currentValue?.email) {
    feedbackFormState.email = formRef.email.value = currentValue.email;
  }

  if (currentValue?.message) {
    feedbackFormState.message = formRef.message.value = currentValue.message;
  }
}

function storageUpdate(event) {
  feedbackFormState[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}

function handleSubmitForm(event) {
  event.preventDefault();

  if (!event.target.email.value || !event.target.message.value) {
    return;
  }

  formDataOutput();
  clearDataStorage();
  event.currentTarget.reset();
}

function formDataOutput() {
  if (getFormCurrentValue()) {
    console.log(getFormCurrentValue());
  }
}

function getFormCurrentValue() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function clearDataStorage() {
  if (getFormCurrentValue()) {
    localStorage.removeItem(STORAGE_KEY);
  }

  feedbackFormState = {};
}
