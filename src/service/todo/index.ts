import moment from "moment";
import sendMailQueue from "../../config/bull";

import { TodoDocument } from "../../dbModel/todo/schema";

export default class TodoService {
  todoDbModel: any;
  constructor({ todoDbModel }: any) {
    this.todoDbModel = todoDbModel;
  }

  async create(
    {
      name,
      isCompleted,
      description,
      when,
    }: {
      name: string;
      isCompleted: boolean;
      description?: string;
      when?: string;
    },
    currentUser: any
  ) {
    try {
      //this.validate() TODO: run this to validate

      let todo = await this.todoDbModel.create({
        name,
        isCompleted,
        description,
        createdByUserId: currentUser._id,
      });

      if (when && when !== "Invalid date") {
        const timeInMill = moment(when, "DD-MM-YYYY HH:mm a").valueOf();
        const currentTime = moment().valueOf();
        sendMailQueue.add(
          { _id: todo._id },
          { delay: timeInMill - currentTime }
        );
      }

      return todo;
    } catch (error) {
      error.status;
      throw error;
    }
  }
  async fetchAll(currentUser: any) {
    try {
      let todos = await this.todoDbModel.findAll(currentUser._id);

      return todos;
    } catch (error) {
      error.status;
      throw error;
    }
  }
  async fetchOne(id: string): Promise<{
    when: string;
    name: string;
    isCompleted: boolean;
    createdByUserId: string;
  }> {
    try {
      let todo = await this.todoDbModel.findById(id);

      return todo;
    } catch (error) {
      error.status;
      throw error;
    }
  }
  async update(id: string, updateData: any, currentUser: any) {
    try {
      let todo = await this.todoDbModel.findByIdAndUpdate(id, updateData);

      return todo;
    } catch (error) {
      error.status;
      throw error;
    }
  }

  async delete(id: string) {
    try {
      let todo = await this.todoDbModel.findByIdAndDelete(id);
      return todo;
    } catch (error) {
      error.status;
      throw error;
    }
  }
}
