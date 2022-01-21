const auth = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ success: false, error: "Unauthorised access" });
  }
};

module.exports = auth;
