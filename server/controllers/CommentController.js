import _commentService from "../services/CommentService"
import express from 'express'
import { Authorize } from '../middleware/authorize.js'
//import _listService from '../Services/ListService'
import _taskService from '../services/TaskService'

export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.user = req.session.uid
      let comment = await _commentService.create(req.body)
      let task = await _taskService.findOne({ _id: req.body.task })
      task.comment.push(comment._id)
      let newTask = await _taskService.findByIdAndUpdate(
        { _id: comment.task },
        task,
        { new: true }
      )
      task = await task.populate('comment').execPopulate()
      return res.status(201).send(comment)
    } catch (error) {
      error.message = "CommentController.js: create()"
      next(error)
    }
  }
}