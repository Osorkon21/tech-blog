async function newpostHandler(e) {
  e.preventDefault();

  const title = document.querySelector("#newpost-title").value.trim();
  const content = document.querySelector('#newpost-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/article`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.href = '/dashboard';
    } else {
      alert('Failed to sign up.');
    }
  }
  else
    alert("Title and Content are required fields.");
};

document.querySelector('.newpost-form').addEventListener('submit', newpostHandler);
