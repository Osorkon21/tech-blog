const router = require('express').Router();
const { User, Article, Comment } = require("../models");

//  /dashboard GET
//  /article/:articleId/comment GET
//  /article/:articleId/edit GET

// homepage route
router.get("/", async (req, res) => {
  try {
    // get all Articles
    const dbArticleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ["username"]
        }
      ]
    });

    // format dbArticleData into something that can be displayed
    const articles = dbArticleData.map((article) => article.get({ plain: true }));

    res.render('home', { articles, loggedIn: req.session.loggedIn });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  }
  else {
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
  }
});

router.get("/article/:articleId/comment", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
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
        },
        comments: [
          {
            content: "This article sucks!",
            username: "TheWorst",
            date: new Date()
          },
          {
            content: "This article makes no sense. DUMB IDIOT!",
            username: "NotGood",
            date: new Date()
          }
        ]
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
        },
        comments: [
          {
            content: "This article sucks!",
            username: "TheWorst",
            date: new Date()
          },
          {
            content: "This article makes no sense. DUMB IDIOT!",
            username: "NotGood",
            date: new Date()
          }
        ]
      };
    }

    res.render("comment", { article, loggedIn: req.session.loggedIn });
  }
});

router.get("/article/:articleId/edit", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  }
  else {
    var article;

    if (req.params.articleId == 0) {
      article = {
        id: "0",
        title: "A Great Title",
        content: "What a wonderful piece of content this is! It might be the greatest content of all time."
      };
    }
    else if (req.params.articleId == 1) {
      article = {
        id: "1",
        title: "A Great Title 2",
        content: "What a wonderful piece of content this is! It might be the second greatest content of all time."
      };
    }

    res.render("editpost", { article, dashboard: true, loggedIn: req.session.loggedIn });
  }
});

// newpost route
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
