import express from "express";
import { Authorize } from "../middleware/authorize.js";
import _boardService from "../services/BoardService";
import _collaboratorService from "../services/CollaboratorService"
import { runInNewContext } from "vm";
//PUBLIC
export default class BoardsController {
  constructor() {
    this.router = express
      .Router()
      .use(Authorize.authenticated)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)

      // COLLABORATORS
      .get("/:boardId/collaborators", this.getCollaborators)
      .post("/:boardId/collaborators/:collaboratorId", this.postCollaborators)
      .delete("/:boardId/collaborators/:collaboratorId", this.deleteCollaborators)
      .put("/:boardId/collaborators/:collaboratorId", this.putCollaborators)

      .use(this.defaultRoute);
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      // let data = await _boardService.find({ user: req.session.uid })
      let data = await _boardService.find();

      return res.send(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await _boardService.findOne({
        _id: req.params.id
        // user: req.session.uid
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      req.body.user = req.session.uid;
      let data = await _boardService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await _boardService.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (data) {
        return res.send(data);
      }
      throw new Error("invalid id");
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await _boardService.findOneAndRemove({
        _id: req.params.id,
        user: req.session.uid
      });
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }

  // COLLABORATORS
  async getCollaborators(req, res, next) {
    try {
      let boardId = req.params.boardId
      let collaborators = await _collaboratorService.find({ board: boardId })
      return res.status(201).send(collaborators)
    } catch (error) {
      error.message = 'BoardControllers.js getCollaborators()'
      next(error)
    }
  }
  async postCollaborators(req, res, next) {
    try {
      let collaborator = req.body
      let createdCollaborator = await _collaboratorService.create(collaborator)
      return res.status(201).send(createdCollaborator)
    } catch (error) {
      error.message = 'BoardControllers.js postCollaborators()'
      next(error)
    }
  }
  async deleteCollaborators(req, res, next) {
    try {
      let collaboratorId = req.params.collaboratorId
      let deletedCollaborator = await _collaboratorService.findOneAndDelete({_id: collaboratorId})
      return res.status(201).send(deletedCollaborator)
    } catch (error) {
      error.message = 'BoardControllers.js deleteCollaborators()'
      next(error)
    }
  }
  async putCollaborators(req, res, next) {
    try {
      let collaboratorId = req.params.collaboratorId
      let collaborator = req.body
      let editedCollaborator = await _collaboratorService.findOneAndUpdate(
        { _id: collaboratorId },
        collaborator,
        { new: true }
      )
      return res.status(201).send(editedCollaborator)
    } catch (error) {
      error.message = 'BoardControllers.js putCollaborators()'
      next(error)
    }
  }
}
