import { Request, Response, NextFunction } from "express";

import { authenticationService } from "../../../service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, user } = await authenticationService.login(req.user);

    res.status(200).json({
      success: true,
      token: `JWT ${token}`,
      user,
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
export const userSessionFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      success: true,
      token: req.body?.token,
      user: req.user,
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
