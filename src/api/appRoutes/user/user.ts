import { Request, Response, NextFunction } from "express";

import { userService } from "../../../service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, mobile, password } = req.body;
    const email =
      typeof req.body.email === "string" ? req.body.email.trim() : "";
    const userCreateServiceResponse = await userService.create(
      { name, email, mobile, password },
      req.user
    );
    res.status(200).json({
      success: true,
      ...userCreateServiceResponse,
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
