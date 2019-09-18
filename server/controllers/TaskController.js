import _taskService from "../services/TaskService"
import express from 'express'
import { Authorize } from '../middleware/authorize.js'

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.create)
      .delete('/deleteTasksByListId/:id', this.deleteTasksByListId)
  }

  async create(req, res, next) {
    try {
      req.body.user = req.session.uid
      let data = await _taskService.create(req.body)
      data = await data.populate('comment').execPopulate()
      return res.status(201).send(data)
    } catch (error) {
      error.message = "TaskController.js: create()"
      next(error)
    }
  }

  async deleteTasksByListId(req, res, next) {
    try {
      await _taskService.deleteMany({ list: req.params.id })
      return res.send("tasks deleted")
    } catch (error) {

    }
  }
}