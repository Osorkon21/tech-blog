const router = require('express').Router();
const { Article } = require("../../models");

// create new Article
router.post("/", async (req, res) => {
  try {
    const result = await Article.create(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.userId
      }
    );

    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// modify existing Article
router.put("/:articleId", async (req, res) => {
  try {
    const result = await Article.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.articleId
        }
      }
    );

    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// delete existing Article
router.delete("/:articleId", async (req, res) => {
  try {
    const result = await Article.destroy({
      where: {
        id: req.params.articleId
      }
    });

    res.status(200).json({ status: "success", result });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

module.exports = router;
