const { Router } = require("express");

const {
  renderProfile,
  renderMatches,
  renderSearch,
} = require("../../controller/view/privateController");

const router = Router();

router.get("/search", renderSearch);
router.get("/profile", renderProfile);
router.get("/matches", renderMatches);

module.exports = router;
