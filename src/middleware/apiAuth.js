const auth = (req, res, next) => {
  if (req.session.loggedIn) {
    console.log("api in session");

    next();
  } else {
    res.status(401).json({ success: false, error: "Unauthorised access" });
  }
};

module.exports = auth;
