import _taskService from "../services/TaskService";
import _commentService from "../services/CommentService";
import express from "express";
import { Authorize } from "../middleware/authorize.js";

export default class TaskController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      // .post("", this.create)
      .post("/:taskId/comments", this.createComment)
      .post("/:taskId/get-comments", this.getCommentsByTaskId)
      .delete("/:taskId/comments/:commentId", this.deleteComment)
      .put("/:taskId/comments/:commentId", this.editComment)
  }

  // async create(req, res, next) {
  //   try {
  //     req.body.user = req.session.uid;
  //     let data = await _taskService.create(req.body);
  //     data = await data.populate("comment").execPopulate();
  //     return res.status(201).send(data);
  //   } catch (error) {
  //     error.message = "TaskController.js: create()";
  //     next(error);
  //   }
  // }

  // COMMENTS
  async createComment(req, res, next) {
    try {
      let newComment = req.body;
      let comment = await _commentService.create(newComment);
      return res.send(comment);
    } catch (error) {
      error.message = "TaskController.js: createTask()";
      next(error);
    }
  }

  async getCommentsByTaskId(req, res, next) {
    try {
      let taskId = req.params.taskId;
      // let userId = req.body.user;
      let tasks = await _commentService
        .find({ task: taskId })
        .populate('user');
      return res.send(tasks);
    } catch (error) {
      error.message = "TaskController.js: getCommentsByTaskId()";
      next(error);
    }
  }

  async deleteComment(req, res, next) {
    try {
      let commentId = req.params.commentId;
      let deleted = await _commentService.deleteOne({ _id: commentId });
      return res.send(deleted);
    } catch (error) {
      error.message = "TaskController.js: deleteComment()";
      next(error);
    }
  }

  async editComment(req, res, next) {
    try {
      let editedComment = await _commentService.findOneAndUpdate(
        { _id: req.params.commentId },
        req.body,
        { new: true }
      )

      return res.status(201).send(editedComment);
    } catch (error) {
      error.message = "TaskController.js: editComment()";
      next(error);
    }
  }
}
