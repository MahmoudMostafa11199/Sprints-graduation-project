const isLogin = () => {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  const loginCookie = cookies.find((c) => c.startsWith('login='));

  if (!loginCookie || !loginCookie.split('=')[1])
    window.location.href = '../../auth/auth.html';
};

(() => {
  isLogin();
})();
