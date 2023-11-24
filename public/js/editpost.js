async function onBtnSubmit(e) {
  e.preventDefault();

  const clickedBtn = e.submitter;
  const articleId = clickedBtn.getAttribute("data-id");

  if (clickedBtn.getAttribute("id") === "update-btn") {
    const title = document.querySelector('#editpost-title').value.trim();
    const content = document.querySelector('#editpost-content').value.trim();

    if (title && content) {
      const response = await fetch(`/api/article/${articleId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.href = '/dashboard';
      }
      else {
        alert('Failed to update post.');
      }
    }
    else
      alert("Title and Content are required fields.");
  }

  // "delete-btn" was clicked
  else {
    const response = await fetch(`/api/article/${articleId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    }
    else {
      alert('Failed to delete post.');
    }
  }
};

document.querySelector('.editpost-form').addEventListener('submit', onBtnSubmit);
