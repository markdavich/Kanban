import _commentService from "../services/CommentService"
import express from 'express'
import { Authorize } from '../middleware/authorize.js'



export default class CommentController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      req.body.user = req.session.uid
      let data = await _commentService.create(req.body)
      return res.status(201).send(data)
    } catch (error) {
      error.message = "CommentController.js: create()"
      next(error)
    }
  }
}