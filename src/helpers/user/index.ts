import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config/env.json";

const signToken = (data: any, expiry: number) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: expiry }, (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
};

const isKeyExpired = (keyExpiry: number) => {
  return keyExpiry ? moment().diff(moment(keyExpiry)) > 0 : true;
};

export = {
  signToken,
  isKeyExpired,
};
