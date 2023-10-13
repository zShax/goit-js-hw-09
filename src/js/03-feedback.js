import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

function saveFormState() {
  const email = feedbackForm.querySelector('[name="email"]').value;
  const message = feedbackForm.querySelector('[name="message"]').value;
  const formData = { email, message };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function populateFormFromLocalStorage() {
  const formData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formData) {
    feedbackForm.querySelector('[name="email"]').value = formData.email || '';
    feedbackForm.querySelector('[name="message"]').value =
      formData.message || '';
  }
}

function clearFormState() {
  localStorage.removeItem('feedback-form-state');
}

feedbackForm.addEventListener('input', throttle(saveFormState, 500));

window.addEventListener('load', populateFormFromLocalStorage);

feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const email = feedbackForm.querySelector('[name="email"]').value;
  const message = feedbackForm.querySelector('[name="message"]').value;
  console.log('Form data submitted:', { email, message });

  clearFormState();

  feedbackForm.querySelector('[name="email"]').value = '';
  feedbackForm.querySelector('[name="message"]').value = '';
});
