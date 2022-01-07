require("dotenv").config();
const routes = require("./routes");

const express = require("express");

const connection = require("./config/connection");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
