const { Router } = require("express");

const apiAuth = require("../../middleware/apiAuth");
const search = require("./search");
const match = require("./match");

const router = Router();

router.use("/search", apiAuth, search);
router.use("/match", apiAuth, match);

module.exports = router;
