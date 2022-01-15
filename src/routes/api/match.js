const { Router } = require("express");

const {
  verifyAndCreateMatch,
  deleteMatchById,
} = require("../../controller/api/match");

const router = Router();

router.post("/", verifyAndCreateMatch);
router.delete("/:id", deleteMatchById);

module.exports = router;
