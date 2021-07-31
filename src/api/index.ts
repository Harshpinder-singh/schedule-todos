const express = require("express");

interface ErrorWithStatus extends Error {
  status: number;
}

const appRoutes = require("./appRoutes");

const router = (app: any) => {
  // const apiRoutes = express.Router();

  // apiRoutes.use("/", appRoutes);

  // apiRoutes.use((req: any, res: any, next: any) => {
  //   if (!req.route) {
  //     const error = new Error("no route matched") as ErrorWithStatus;
  //     error.status = 404;
  //     return next(error);
  //   }

  //   next();
  // });

  app.use("/api", appRoutes);
};

module.exports = router;
