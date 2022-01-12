const { Router } = require("express");

const {
  renderProfile,
  renderMatches,
  renderMessage,
  renderSearch,
} = require("../../controller/view/privateController");

const router = Router();

router.get("/profile/:id", renderProfile);
router.get("/search", renderSearch);
router.get("/matches", renderMatches);
router.get("/message", renderMessage);

module.exports = router;
