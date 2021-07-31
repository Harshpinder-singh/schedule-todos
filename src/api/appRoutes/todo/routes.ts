const express = require("express");

import { requireUserLogin } from "../../authentication";

import * as todo from "./todo";

export const todoRoutes = express.Router();

todoRoutes.post("/", todo.create);
todoRoutes.get("/", todo.fetchAll);
todoRoutes.get("/:id", todo.fetchOne);
todoRoutes.put("/:id", todo.update);
todoRoutes.delete("/:id", todo.destroy);
