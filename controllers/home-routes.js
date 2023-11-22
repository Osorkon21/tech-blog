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

router.get("/dashboard", async (req, res) => {
  const userArticles = {
    articles: [
      {
        id: "0",
        title: "A Great Title",
        date: new Date()
      },
      {
        id: "1",
        title: "A Greater Title",
        date: new Date()
      }
    ]
  };

  res.render("dashboard", { userArticles, dashboard: true, loggedIn: req.session.loggedIn });
});

router.get("/articles/:articleId/comment", async (req, res) => {

  if (!req.session.loggedIn) {
    res.render("login", { loggedIn: req.session.loggedIn });
  }
  else {
    var article;

    if (req.params.articleId == 0) {
      article = {
        id: "0",
        title: "A Great Title",
        content: "What a wonderful piece of content this is! It might be the greatest content of all time.",
        metadata: {
          user: "A Great User",
          date: new Date()
        }
      };
    }
    else if (req.params.articleId == 1) {
      article = {
        id: "1",
        title: "A Great Title 2",
        content: "What a wonderful piece of content this is! It might be the second greatest content of all time.",
        metadata: {
          user: "A Great User 2",
          date: new Date()
        }
      };
    }

    // render all comments as well, include after article...

    res.render("comment", { article, loggedIn: req.session.loggedIn });
  }
});

router.get("/newpost", (req, res) => {
  res.render("newpost", { dashboard: true, loggedIn: req.session.loggedIn });
});

// login route
router.get("/login", (req, res) => {
  res.render("login", { loggedIn: req.session.loggedIn });
});

// signup route
router.get("/signup", (req, res) => {
  res.render("signup", { loggedIn: req.session.loggedIn });
});

module.exports = router;
