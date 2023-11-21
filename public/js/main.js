document.querySelector("body").addEventListener("click", (e) => {
  const articleId = e.target.getAttribute("data-id");

  if (articleId) {
    console.log(articleId);
    document.location.href = `articles/${articleId}`;
  }
});
