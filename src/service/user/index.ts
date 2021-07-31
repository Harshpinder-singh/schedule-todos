import { UserDocument } from "../../dbModel/user/schema";

export default class UserService {
  userDbModel: any;
  constructor({ userDbModel }: any) {
    this.userDbModel = userDbModel;
  }

  async create(
    {
      name,
      email,
      mobile,
      password,
    }: { name: string; email: string; mobile: string; password: any },
    currentUser: any
  ) {
    try {
      //   await this.validate({ name, email, role, mobile, category })
      let user = await this.userDbModel.create({
        name,
        email,
        password,
        mobile,
      });

      const formattedUser = await this.userDbModel.findById(user._id);

      return {
        message: "User was registered successfully",
        user: formattedUser,
      };
    } catch (error) {
      error.status;
      throw error;
    }
  }
  async fetchOne(id: string): Promise<{
    message: string;
    user: {
      _id: any;
      email: string;
      name: string;
      password: string;
      key: string;
      keyExpiry: string;
    };
  }> {
    try {
      const formattedUser = await this.userDbModel.findById(id);
      return { message: "User was invited successfully", user: formattedUser };
    } catch (error) {
      error.status;
      throw error;
    }
  }
}
