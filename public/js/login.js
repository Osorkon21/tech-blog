const onBtnClick = async (e) => {
  e.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      // go to home page after logging in
      document.location.replace('/');
    } else {
      alert('Failed to log in - incorrect email or password.');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', onBtnClick);
