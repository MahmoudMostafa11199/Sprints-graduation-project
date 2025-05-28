const isLogin = () => {
  // const login = JSON.parse(localStorage.getItem('login'));

  const cookies = document.cookie.split(';').map((c) => c.trim());
  const loginCookie = cookies.find((c) => c.startsWith('login='));

  if (!loginCookie || !loginCookie.split('=')[1])
    window.location.href = '../../index.html';
  // if (!login) window.location.href = '../../index.html';
};

(() => {
  isLogin();
})();
