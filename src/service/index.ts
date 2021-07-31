import AuthenticationService from "./authentication";
import UserService from "./user";
import TodoService from "./todo";

import UserDbModel from "../dbModel/user";
import TodoDbModel from "../dbModel/todo";

const userDbModel = new UserDbModel();
const todoDbModel = new TodoDbModel();

export const authenticationService = new AuthenticationService({
  userDbModel,
});
export const userService = new UserService({
  userDbModel,
});
export const todoService = new TodoService({
  todoDbModel,
});
