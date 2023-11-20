const router = require('express').Router();
const { User, Article, Comment } = require("../models");

// write handlebars HTML? Or write routes?

router.get("/", async (req, res) => {
  try {
    res.render("home");
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

module.exports = router;
