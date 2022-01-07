require("dotenv").config();
const routes = require("./routes");

const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require("path");
const connection = require("./config/connection");

const PORT = process.env.PORT || 4000;
const hbs = expressHandleBars.create({});
const app = express();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
