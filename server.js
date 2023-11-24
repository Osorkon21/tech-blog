// import necessary packages
const path = require("path");
const express = require("express");
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require('./utils/helpers');

// set up express
const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'This is classified and top secret',

  // create a cookie
  cookie: {
    // Stored in milliseconds, expires after 1 day
    maxAge: 24 * 60 * 60 * 1000
  },
  resave: false,

  // don't save new sessions if user is not logged in
  saveUninitialized: false,

  // where to store the cookie
  store: new SequelizeStore({
    db: sequelize
  }),
};

// use created session
app.use(session(sess));

// use handlebars helpers
const hbs = exphbs.create({ helpers });

// set up handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// set up express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// direct traffic along these routes
app.use(routes);

// is the environment production or development?
const okToSync = (process.env.NODE_ENV === "production") ? false : true;

// sync database - delete database content and start fresh if not in a production environment - then listen for requests on the given port
sequelize.sync({ force: okToSync }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
