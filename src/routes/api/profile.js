const { Router } = require("express");

const { updateProfileById } = require("../../controller/api/profile");

const router = Router();

router.put("/:id", updateProfileById);

module.exports = router;
