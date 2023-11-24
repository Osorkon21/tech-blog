const signupFormHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
  else
    alert("Username and Password are required fields.");
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
