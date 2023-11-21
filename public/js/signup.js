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

      // go to home page after signing up
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
  else
    alert("All fields are required.");
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
