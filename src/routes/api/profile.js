const { Router } = require("express");

const {
  updateProfileById,
  getProfileById,
} = require("../../controller/api/profile");

const router = Router();

router.put("/:id", updateProfileById);
router.get("/:id", getProfileById);

module.exports = router;
