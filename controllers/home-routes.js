const router = require('express').Router();
const { User, Article, Comment } = require("../models");

// write handlebars HTML? Or write routes?

router.get("/", async (req, res) => {
  try {
    const dummyData = {
      articles: [{
        title: "A Great Title",
        content: "What a wonderful piece of content this is! It might be the greatest content of all time.",
        metadata: {
          user: "A Great User",
          date: new Date()
        }
      }]
    };

    res.render("home", { dummyData, loggedIn: true });
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
})

module.exports = router;
