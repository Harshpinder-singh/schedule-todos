import TodoModel from "./schema";

class TodoDbModel {
  constructor() {}

  async create(user: any) {
    try {
      return await TodoModel.create(user);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    return await TodoModel.findOne({ _id: id });
  }

  async findAll(id: string) {
    return await TodoModel.find({ createdByUserId: id });
  }

  async findByIdAndDelete(id: string) {
    return await TodoModel.deleteOne({ _id: id });
  }

  async findByIdAndUpdate(userId: string, updateData: any) {
    try {
      const object = await TodoModel.findByIdAndUpdate(userId, updateData, {
        new: true,
      }).lean();
      return object;
    } catch (error) {
      throw error;
    }
  }
}

export default TodoDbModel;
