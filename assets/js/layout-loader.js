(async () => {
  const resHeader = await fetch('../components/header.html');
  const headerData = await resHeader.text();

  const resFooter = await fetch('../components/footer.html');
  const footerData = await resFooter.text();

  // document.querySelector('header').innerHTML = data;
  document.body.insertAdjacentHTML('afterbegin', headerData);
  document.body.insertAdjacentHTML('beforeend', footerData);
})();
