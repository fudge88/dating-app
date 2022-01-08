require("dotenv").config();

const express = require("express");
const expressHandleBars = require("express-handlebars");
const path = require("path");

const connection = require("./config/connection");
const routes = require("./routes");

const { logInfo } = require("./utils/logger");

const PORT = process.env.PORT || 4000;

const hbs = expressHandleBars.create({});
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);
app.use(express.urlencoded({ extended: true }));

const init = async () => {
  try {
    await connection.sync({ force: false });

    console.log("[INFO]: DB connection successful");

    app.listen(PORT, () =>
      logInfo("Server connection", `🚀🚀 http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(`[ERROR]: DB connection failed | ${error.message}`);
  }
};

init();
