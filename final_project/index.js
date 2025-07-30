const express = require('express');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

// Setup session middleware globally for /customer routes
app.use("/customer", session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false } // false for development, true for HTTPS
}));

// Auth middleware to protect /customer/auth/* routes
app.use("/customer/auth/*", function auth(req, res, next) {
  if (!req.session.username) {
    return res.status(401).json({ message: "User not logged in." });
  }
  next();
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
