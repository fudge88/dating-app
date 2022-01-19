const { Router } = require("express");

const {
  renderProfile,
  renderSearch,
} = require("../../controller/view/privateController");

const router = Router();

router.get("/search", renderSearch);
router.get("/profile", renderProfile);

module.exports = router;
