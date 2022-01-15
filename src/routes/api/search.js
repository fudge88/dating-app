const { Router } = require("express");

const { getRandomUser } = require("../../controller/api/search");

const router = Router();

router.post("/", getRandomUser);

module.exports = router;
