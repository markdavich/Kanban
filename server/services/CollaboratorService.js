import mongoose from "mongoose"
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _schema = new Schema({
  user: {type: ObjectId, ref: 'User', required: true},
  board: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })


export default mongoose.model('Collaborator', _schema)