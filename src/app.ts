const express = require("express");
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";

import initDbConnection from "./config/db/dbConnection";
const router = require("./api/index");

import { PORT } from "./config/env.json";
// import bull from "./config/bull/index.js";

initDbConnection();

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
router(app);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listing at http://localhost:${process.env.PORT}`);
});
