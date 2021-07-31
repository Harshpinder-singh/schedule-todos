import UserModel, { UserDocument } from "./schema";

class UserDbModel {
  fieldsToPopulate: string;
  constructor() {
    this.fieldsToPopulate = "email name mobile";
  }

  async create(user: any) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    return await UserModel.findOne({ _id: id });
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async findByMobile(mobile: string) {
    return await UserModel.findOne({ mobile });
  }

  async findByIdAndUpdate(userId: string, updateData: any) {
    try {
      const object = await UserModel.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).lean();
      return object;
    } catch (error) {
      throw error;
    }
  }

  async findOneByQueryForAuth(query: any) {
    try {
      const object = await UserModel.findOne(query);
      return object;
    } catch (error) {
      throw error;
    }
  }

  async findByIdForAuth(id: string) {
    return await this.findOneByQueryForAuth({ _id: id });
  }

  async findByEmailForAuth(email: string) {
    return await this.findOneByQueryForAuth({ email });
  }

  async findByMobileForAuth(mobile: string) {
    return await this.findOneByQueryForAuth({ mobile });
  }
}

export default UserDbModel;
