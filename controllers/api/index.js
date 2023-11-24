const router = require('express').Router();

const userRoutes = require('./user-routes');
const articleRoutes = require("./article-routes");
const commentRoutes = require("./comment-routes");

router.use('/user', userRoutes);
router.use("/article", articleRoutes);
router.use("/comment", commentRoutes);

module.exports = router;
