import mongoose from "mongoose"
import TaskService from "./TaskService"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let _schema = new Schema({
  title: { type: String },
  user: { type: ObjectId, ref: 'User', required: true },
  board: { type: ObjectId, ref: 'Board', required: true }
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('deleteMany', function (next) {
  let _taskService = TaskService
  //lets find all the lists and remove them
  Promise.all([
    _taskService.deleteMany({ list: this._conditions._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  let _taskService = TaskService
  //lets find all the lists and remove them
  Promise.all([
    _taskService.deleteMany({ list: this._conditions._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default mongoose.model('List', _schema)