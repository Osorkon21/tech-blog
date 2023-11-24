const router = require('express').Router();
const { Comment } = require("../../models");

// create new Comment
router.post("/", async (req, res) => {
  try {
    const result = await Comment.create(
      {
        content: req.body.content,
        user_id: req.session.userId,
        article_id: req.body.articleId
      }
    );

    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

module.exports = router;
