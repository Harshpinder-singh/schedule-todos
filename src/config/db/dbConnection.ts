// src/db/connect.ts

import mongoose from "mongoose";

import { DB_URL } from "../env.json";

function connect() {
  return mongoose
    .connect(process.env.DB_URL || DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("db error", error);
      process.exit(1);
    });
}

export default connect;
