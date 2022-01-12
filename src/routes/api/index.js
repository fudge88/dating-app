const { Router } = require("express");

const apiAuth = require("../../middleware/apiAuth");
const search = require("./search");

const router = Router();

router.use("/search", apiAuth, search);

module.exports = router;
