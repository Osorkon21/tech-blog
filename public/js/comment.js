const submitCommentHandler = async (e) => {
  const textAreaEl = document.querySelector("textarea");
  const content = textAreaEl.value.trim();
  const articleId = textAreaEl.getAttribute("id");

  if (content && articleId) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ content, articleId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/article/${articleId}/comment`);
    } else {
      alert('Failed to save comment.');
    }
  }
  else
    alert("Your comment cannot be empty.");
};

document.querySelector('#submit-btn').addEventListener('click', submitCommentHandler);
