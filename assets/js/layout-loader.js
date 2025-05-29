///////////////////////////////////////////////////////////
// Upload Header and Footer (Display)
const uploadLayout = async () => {
  const resHeader = await fetch('../layout/header.html');
  const headerData = await resHeader.text();

  const resFooter = await fetch('../layout/footer.html');
  const footerData = await resFooter.text();

  document.body.insertAdjacentHTML('afterbegin', headerData);
  document.body.insertAdjacentHTML('beforeend', footerData);
};

///////////////////////////////////////////////////////////
// Sticky Nav
const stickyNav = () => {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      document.body.classList.add('sticky');
    } else {
      document.body.classList.remove('sticky');
    }
  });
};

///////////////////////////////////////////////////////////
// Display user name
const displayUserName = () => {
  const cookies = document.cookie.split(';').map((c) => c.trim(''));
  const name = cookies.find((c) => c.startsWith('login=')).split('=')[1];

  if (!name) return;

  document.querySelector('.user-name').textContent = name;
};

///////////////////////////////////////////////////////////
// Logout
const logout = () => {
  document.querySelector('.btn-logout').addEventListener('click', () => {
    document.cookie = 'login=; max-age=0; path=/';
    window.location.href = '../../auth/auth.html';
  });
};

///////////////////////////////////////////////////////////
// init
(async () => {
  await uploadLayout();
  stickyNav();
  displayUserName();
  logout();
})();
