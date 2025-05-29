// Form Elements
const formEl = document.querySelector('form');
const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');

const invalidLoginEl = document.querySelector('.invalid-login');
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

  if (!usernameEl.value || !passwordEl.value) return;

  const userData = users.find((user) => user.username === usernameEl.value);

  // Check if login credentials are correct
  if (!userData || usernameEl.value !== userData.username) {
    invalidLoginEl.textContent = 'User not found';
    invalidLoginEl.classList.remove('hidden');
  } else if (passwordEl.value !== userData.password) {
    invalidLoginEl.textContent = 'Incorrect password';
    invalidLoginEl.classList.remove('hidden');
  } else {
    invalidLoginEl.classList.add('hidden');

    document.cookie = `login=${userData.name}; max-age=${60 * 60 * 24}; path=/`;
    formEl.reset();

    sessionStorage.setItem('toast', `Welcome ${userData.name}`);
    window.location.href = '../index.html';
  }
});

//////////////////////////////////////////
// Register functionality
btnRegister?.addEventListener('click', (e) => {
  e.preventDefault();

  // Check if any registration field is empty
  if (!nameEl.value || !emailEl.value || !usernameEl.value || !passwordEl.value)
    return;

  const user = {
    name: nameEl.value,
    email: emailEl.value,
    username: usernameEl.value,
    password: passwordEl.value,
  };

  // Check email is valid
  if (!checkEmail(emailEl.value)) {
    checkEmailEl.classList.remove('hidden');

    // Check username is already exists
  } else if (checkUsername(usernameEl.value)) {
    checkUsernameEl.textContent = `Username ${usernameEl.value} is not available`;
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
  return index !== -1 ? true : false;
};
