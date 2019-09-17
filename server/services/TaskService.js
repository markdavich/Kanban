import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  description: { type: String, required: true, default: "New Task" },
  list: { type: ObjectId, ref: 'List' },
  user: { type: ObjectId, ref: 'User' },
  board: { type: ObjectId, ref: 'Board' },
  comment: [{ type: ObjectId, ref: 'Comment' }],
  order: { type: Number, required: true, default: 0 },

})

export default mongoose.model('Task', _schema)