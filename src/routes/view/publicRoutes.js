const { Router } = require("express");
const router = Router();

const {
  renderHome,
  renderSearchPage,
  renderLogin,
  renderSignUp,
} = require("../../controller/view/publicController");

router.get("/", renderHome);
router.get("/login", renderLogin);
router.get("/signup", renderSignUp);

module.exports = router;
