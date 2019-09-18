import mongoose from "mongoose"
import ListService from './ListService'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let _listRepo = new ListService().repository

let _schema = new Schema({
  title: { type: String },
  description: { type: String, required: true },
  user: { type: ObjectId, ref: 'User', required: true },
  collaborators: [{ type: ObjectId, ref: 'User' }]
}, { timestamps: true })

//CASCADE ON DELETE
_schema.pre('findOneAndRemove', function (next) {
  //lets find all the lists and remove them
  Promise.all([
    _listRepo.deleteMany({ board: this._conditions._id })
  ])
    .then(() => next())
    .catch(err => next(err))
})

export default mongoose.model('Board', _schema)