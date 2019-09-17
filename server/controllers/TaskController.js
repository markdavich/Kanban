import _taskService from "../services/TaskService"
import express from 'express'
import { Authorize } from '../middleware/authorize.js'

export default class TaskController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.user = req.session.uid
      let data = await _taskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      error.message = "TaskController.js: create()"
      next(error)
    }
  }
}