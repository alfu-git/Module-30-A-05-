document.getElementById('sign-in-btn').addEventListener('click', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // check empty
  if (username === '' || password === '') {
    alert ('Enter username & password!');
    return;
  }

  // check username & password
  if (username !== 'admin') {
    alert ('Wrong Username!');
    return;
  }
  else if (password !== 'admin123') {
    alert ('Wrong Password!');
    return;
  }

  // login successfully
  if (username === 'admin' && password === 'admin123') {
    alert ('Login Successful');
    window.location.assign('./home.html');
  }
})