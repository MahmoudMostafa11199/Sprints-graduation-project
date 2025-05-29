(() => {
  const toastMessage = sessionStorage.getItem('toast');

  if (toastMessage) {
    showNotification(toastMessage);
    sessionStorage.removeItem('toast');
  }
})();
