const router = require('express').Router();
const { User, Article, Comment } = require("../models");

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

    // format dbArticleData into something that can be easily displayed
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
    try {
      // get all User Articles
      const dbUserArticleData = await Article.findAll({
        where: {
          user_id: req.session.userId
        }
      });

      // format dbUserArticleData into something that can be easily displayed
      const userArticles = dbUserArticleData.map((article) => article.get({ plain: true }));

      res.render("dashboard", { userArticles, dashboard: true, loggedIn: req.session.loggedIn });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", result: err.message });
    }
  }
});

router.get("/article/:articleId/comment", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  }
  else {
    try {
      // get an Article
      const dbArticleData = await Article.findOne({
        include: [
          {
            model: User,
            attributes: ["username"]
          },
          {
            model: Comment,
            attributes: ["content", "createdAt"],
            include: [
              {
                model: User,
                attributes: ["username"]
              }
            ]
          }
        ],
        where: {
          id: req.params.articleId
        }
      });

      // format dbUserArticleData into something that can be easily displayed
      const article = dbArticleData.get({ plain: true });

      res.render("comment", { article, loggedIn: req.session.loggedIn });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", result: err.message });
    }
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
