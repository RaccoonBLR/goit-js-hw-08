import throttle from 'lodash.throttle';

const feedbackFormState = {};
const STORAGE_KEY = 'feedback-form-state';

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
  feedbackFormState[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}

function handleSubmitForm(event) {
  event.preventDefault();

  formDataOutput();
  clearFormDataStorage();
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

function clearFormDataStorage() {
  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
  }
}
