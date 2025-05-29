(() => {
  const toastMessage = sessionStorage.getItem('toast');

  if (toastMessage) {
    Toastify({
      text: toastMessage,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'center',
      stopOnFocus: true,
      style: {
        background:
          'linear-gradient(to right, var(--primary-color), var(--primary-color-light))',
      },
    }).showToast();
    sessionStorage.removeItem('toast');
  }
})();
