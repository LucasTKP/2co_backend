import { Document, Schema, Model, model } from "mongoose"

export interface ITask extends Document {
  taskId: String
  name: String
}

export const taskSchema = new Schema({
  taskId: {
    type: String, required: true,
    unique: true
  },
  name: String
})



export const Task: Model<ITask> = model<ITask>("Tasks", taskSchema)