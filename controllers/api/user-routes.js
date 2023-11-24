const router = require('express').Router();
const { User } = require('../../models');

// sign up new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const plainData = dbUserData.get({ plain: true });

    req.session.loggedIn = true;
    req.session.userId = plainData.id;

    req.session.save(() => {
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      }
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const plainData = dbUserData.get({ plain: true });

    req.session.loggedIn = true;
    req.session.userId = plainData.id;

    req.session.save(() => {
      res.status(200).json({ user: plainData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", result: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
