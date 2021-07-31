import { NextFunction, Request, Response } from "express";
import passport from "passport";
import * as passportLocal from "passport-local";
import allStrategy from "passport-jwt";
import * as passJwt from "passport-jwt";

const LocalStrategy = passportLocal.Strategy;

import { authenticationService } from "../service";

const JwtStrategy = allStrategy.Strategy;
const ExtractJwt = passJwt.ExtractJwt;

import { JWT_SECRET } from "../config/env.json";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRET || JWT_SECRET,
  passReqToCallback: true,
};

const jwtLogin = new JwtStrategy(
  jwtOptions,
  async (req: Request, payload: any, done: any) => {
    try {
      const response = await authenticationService.authenticateUserByToken(
        payload
      );
      if (response.success) return done(null, response.user);
      done(null, false);
    } catch (error) {
      error.status = 401;
      done(error);
    }
  }
);

// Setting up local login strategy
const localOptions: passportLocal.IStrategyOptionsWithRequest = {
  usernameField: "email",
  passReqToCallback: true,
};

const localLogin = new LocalStrategy(
  localOptions,
  async (req: Request, email: string, password: string, done: any) => {
    try {
      const response =
        await authenticationService.authenticateUserByEmailPassword(
          email,
          password
        );
      if (response.success) return done(null, response.user);
      done(response.done, false, null);
    } catch (error) {
      error.status = 401;
      done(error);
    }
  }
);

passport.use(jwtLogin);
passport.use(localLogin);

export const requireUserAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

export const authError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(err.status || 401)
    .json(
      err.status
        ? { success: false, message: err.message }
        : { success: false, message: "Something went wrong" }
    );
};

export const requireUserLogin = passport.authenticate("local", {
  session: false,
  failWithError: true,
});
