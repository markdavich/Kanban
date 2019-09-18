import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  task: { type: ObjectId, ref: 'Task', required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  board: { type: ObjectId, ref: 'Board', required: true },
  description: { type: String, required: true, default: "change when we can add" }

})
export default mongoose.model('Comment', _schema)