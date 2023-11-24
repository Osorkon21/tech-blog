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
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in - incorrect username or password.');
    }
  }
  else
    alert("Username and Password are required fields.");
};

document.querySelector('.login-form').addEventListener('submit', onBtnClick);
