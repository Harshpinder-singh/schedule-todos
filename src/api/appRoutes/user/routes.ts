const express = require("express");

import {
  authError,
  requireUserAuth,
  requireUserLogin,
} from "../../authentication";

import * as user from "./user";
import { login, userSessionFromToken } from "./authentication";

export const userRoutes = express.Router();
export const authRoutes = express.Router();

authRoutes.post("/login", requireUserLogin, login, authError);

userRoutes.post("/register", user.register, authError);
userRoutes.post("/token", requireUserAuth, userSessionFromToken);
