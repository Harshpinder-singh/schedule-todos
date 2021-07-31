import mongoose from "mongoose";

export interface TodoDocument extends mongoose.Document {
  name: string;
  description?: string;
  isCompleted: boolean;
  createdByUserId: string;
}

const TodoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    createdByUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function checkUndefined(value?: string) {
  return value || undefined;
}

const Todo = mongoose.model<TodoDocument>("Todo", TodoSchema);

export default Todo;
