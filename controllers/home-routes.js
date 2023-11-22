const router = require('express').Router();
const { User, Article, Comment } = require("../models");

// homepage route
router.get("/", async (req, res) => {
  try {
    const dummyData = {
      articles: [
        {
          // article_id
          id: "0",
          title: "A Great Title",
          content: "What a wonderful piece of content this is! It might be the greatest content of all time.",
          metadata: {
            user: "A Great User",
            date: new Date()
          }
        },
        {
          id: "1",
          title: "A Great Title 2",
          content: "What a wonderful piece of content this is! It might be the second greatest content of all time.",
          metadata: {
            user: "A Great User 2",
            date: new Date()
          }
        }
      ]
    };

    res.render("home", { dummyData, loggedIn: req.session.loggedIn });
  }
  catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", (req, res) => {
  // get all user generated articles here...

  res.render("dashboard", { dashboard: true, loggedIn: req.session.loggedIn })
})

// login route
router.get("/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

// signup route
router.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn });
});

module.exports = router;
