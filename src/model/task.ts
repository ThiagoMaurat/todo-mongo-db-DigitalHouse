import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: {
    type: String,
    require: [true, "Please, add a name"],
    unique: false,
    trim: true,
    maxLength: [40, "Name cannot be more than 40 charactere"],
  },
  category: {
    type: String,
    require: [true, "Please, add a description"],
    unique: false,
    trim: true,
    maxLength: [200, "Name cannot be more than 200 charactere"],
  },
  date: {
    type: String,
    require: [true, "Please, add a description"],
    unique: false,
    trim: true,
  },
  description: {
    type: String,
    require: [true, "Please, add a description"],
    unique: false,
    trim: true,
  },
});

const TaskModel = models.Task || model("Task", TaskSchema);

export default TaskModel;
