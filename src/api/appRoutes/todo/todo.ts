import { Request, Response, NextFunction } from "express";

import { todoService } from "../../../service";

export const create = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.create(req.body, req.user);
    res.status(201).json({
      success: true,
      todo,
      message: "Todo successfully created",
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.status
          ? { success: false, message: error.message }
          : { success: false, message: "Something went wrong" }
      );
  }
};

export const fetchAll = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.fetchAll(req.user);
    res.status(201).json({
      success: true,
      todos,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.status
          ? { success: false, message: error.message }
          : { success: false, message: "Something went wrong" }
      );
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.update(req.params.id, req.body, req.user);
    res.status(201).json({
      success: true,
      todo,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.status
          ? { success: false, message: error.message }
          : { success: false, message: "Something went wrong" }
      );
  }
};
export const destroy = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.delete(req.params.id);
    res.status(201).json({
      success: true,
      todo,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.status
          ? { success: false, message: error.message }
          : { success: false, message: "Something went wrong" }
      );
  }
};
export const fetchOne = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.fetchOne(req.params.id);
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json(
        error.status
          ? { success: false, message: error.message }
          : { success: false, message: "Something went wrong" }
      );
  }
};
