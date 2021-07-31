import moment from "moment";
import randomstring from "randomstring";

const { signToken, isKeyExpired } = require("../../helpers/user");

export default class AuthenticationService {
  userDbModel: any;
  accessTokenValidity: number;

  constructor({ userDbModel }: any) {
    this.userDbModel = userDbModel;
    this.accessTokenValidity = 60 * 60; // 60mins
  }

  authenticateUserByEmailPassword(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    user?: any;
    done?: { message: string; status: number };
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userDbModel.findByEmailForAuth(email);

        if (!user) {
          return resolve({
            success: false,
            done: { message: "Invalid email or password", status: 401 },
          });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return resolve({
            success: false,
            done: { message: "Invalid email/mobile or password", status: 401 },
          });
        }

        return resolve({ success: true, user });
      } catch (error) {
        reject(error);
      }
    });
  }

  authenticateUserByToken(
    payload: any
  ): Promise<{ success: boolean; user?: any }> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userDbModel.findById(payload._id);
        if (user && user.key === payload.key) {
          return resolve({ success: true, user });
        }

        return resolve({ success: false });
      } catch (error) {
        reject(error);
      }
    });
  }

  async login(user: any) {
    try {
      if (!user.key || isKeyExpired(user.keyExpiry)) {
        const key = `${Date.now()}${randomstring.generate()}`;
        const keyExpiry = moment().add(3, "M").seconds(0).format();

        await this.userDbModel.findByIdAndUpdate(user._id, {
          key,
          keyExpiry,
        });

        user = await this.userDbModel.findByIdForAuth(user._id);
      }

      const token = await signToken(
        { _id: user._id, key: user.key },
        this.accessTokenValidity
      );

      return { token, user };
    } catch (error) {
      throw error;
    }
  }

  // async refreshAccessToken(user:any) {
  //   try {

  //     if (isKeyExpired(user.keyExpiry)) {
  //       const key = `${Date.now()}${randomstring.generate()}`;
  //       // set key expiry for 3 months
  //       const keyExpiry = moment().add(3, "M").seconds(0).format();

  //       // update key & keyExpiry in DB
  //       await this.userDbModel.findByIdAndUpdate(user._id, {
  //         key,
  //         keyExpiry,
  //       });
  //       // fetch updated user
  //       user = await this.userDbModel.findByIdForAuth(user._id);
  //     }

  //     const token = await signToken(
  //       { _id: user._id, key: user.key },
  //       this.accessTokenValidity
  //     );

  //     return token;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
