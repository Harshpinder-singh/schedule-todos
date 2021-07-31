import express from "express";

import { requireUserAuth } from "../authentication";

import { authRoutes, userRoutes } from "./user/routes";
import { todoRoutes } from "./todo/routes";

const appRoutes = express.Router();

appRoutes.use("/user/auth", authRoutes);
appRoutes.use("/user", userRoutes);
appRoutes.use("/todo", requireUserAuth, todoRoutes);

module.exports = appRoutes;
