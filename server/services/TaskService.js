import mongoose from "mongoose"
import CommentService from "./CommentService"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let _commentService = new CommentService()

let _schema = new Schema({
  description: { type: String, required: true, default: "New Task" },
  list: { type: ObjectId, ref: 'List' },
  user: { type: ObjectId, ref: 'User' },
  board: { type: ObjectId, ref: 'Board' },
  comment: [{ type: ObjectId, ref: 'Comment' }],
  order: { type: Number, required: true, default: 0 },

})
_schema.pre('deleteMany', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _commentService.deleteMany({ list: this._conditions._id }),
  ])
    .then(() => next())
    .catch(err => next(err))
})

//cascade delete the comments
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _commentService.deleteMany({ task: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})


export default mongoose.model('Task', _schema)
