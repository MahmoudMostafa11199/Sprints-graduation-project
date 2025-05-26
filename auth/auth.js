// Login form elements
const formEl = document.querySelector('form');
const usernameLoginEl = document.querySelector('.form-login #username');
const passwordLoginEl = document.querySelector('.form-login #password');
const invalidLoginEl = document.querySelector('.invalid-login');

// Registration form elements
const nameRegisterEl = document.querySelector('.form-register #name');
const emailRegisterEl = document.querySelector('.form-register #email');
const usernameRegisterEl = document.querySelector('.form-register #username');
const passwordRegisterEl = document.querySelector('.form-register #password');
const checkEmailEl = document.querySelector('.check-email');
const checkUsernameEl = document.querySelector('.check-username');

// Buttons
const btnLogin = document.querySelector('.btn__login');
const btnRegister = document.querySelector('.btn__register');

//
const users = JSON.parse(localStorage.getItem('users')) || [];

//////////////////////////////////////////
// Login functionality
btnLogin?.addEventListener('click', (e) => {
  e.preventDefault();

  if (!usernameLoginEl.value || !passwordLoginEl.value) return;

  const userData = users.find(
    (user) => user.username === usernameLoginEl.value
  );

  // Check if login credentials are correct
  if (!userData || usernameLoginEl.value !== userData.username) {
    invalidLoginEl.textContent = 'User not found';
    invalidLoginEl.classList.remove('hidden');
  } else if (passwordLoginEl.value !== userData.password) {
    invalidLoginEl.textContent = 'Incorrect password';
    invalidLoginEl.classList.remove('hidden');
  } else {
    invalidLoginEl.classList.add('hidden');
    formEl.reset();
    window.location.href = '../products/products.html';
  }
});

//////////////////////////////////////////
// Register functionality
btnRegister?.addEventListener('click', (e) => {
  e.preventDefault();

  // Check if any registration field is empty
  if (
    !nameRegisterEl.value ||
    !emailRegisterEl.value ||
    !usernameRegisterEl.value ||
    !passwordRegisterEl.value
  )
    return;

  const user = {
    name: nameRegisterEl.value,
    email: emailRegisterEl.value,
    username: usernameRegisterEl.value,
    password: passwordRegisterEl.value,
  };

  // Check email is valid
  if (!checkEmail(emailRegisterEl.value)) {
    checkEmailEl.classList.remove('hidden');

    // Check username is already exists
  } else if (checkUsername(usernameRegisterEl.value)) {
    checkUsernameEl.textContent = `Username ${usernameRegisterEl.value} is not available`;
    checkUsernameEl.classList.remove('hidden');
    checkEmailEl.classList.add('hidden');

    // If both are valid, save the new user
  } else {
    checkEmailEl.classList.add('hidden');
    checkUsernameEl.classList.add('hidden');

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));
    formEl.reset();
    window.location.href = './auth.html';
  }
});

//////////////////////////////////////////
// Function to validate email format using regex
const checkEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

//////////////////////////////////////////
// Function to check if username is already taken
const checkUsername = (username) => {
  const index = users.findIndex((user) => user.username === username);
  console.log(index);
  return index !== -1 ? true : false;
};
