import { Comment, Comments } from "../models/comments";
import { Request, Response, Router } from "express";

const c = new Comments();

const show = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;

    const comments: Comment[] = await c.show(post_id);
    res.json(comments);
  } catch (err) {
    res.status(404).json(`couldn't show comments ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const creator_id = req.params.user_id;
    const post_id = req.params.post_id;
    const content = req.body.content;

    const comment: Comment = await c.create(content, post_id, creator_id);

    res.json(comment);
  } catch (err) {
    res.status(400).json(`couldn't create comment ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.comment_id;
    const content = req.body.content;

    const comment: Comment = await c.update(id, content);

    res.json(comment);
  } catch (err) {
    res.status(400).json(`couldn't update comment ${err}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.comment_id;

    const comment = await c.remove(id);

    res.json({
      status: "comment deleted successfully",
      comment,
    });
  } catch (err) {
    res.status(400).json(`couldn't delete comment ${err}`);
  }
};

const commentsRoutes = Router({ mergeParams: true });

commentsRoutes.get("/", show);
commentsRoutes.post("/", create);
commentsRoutes.post("/:comment_id", update);
commentsRoutes.delete("/:comment_id", remove);

export default commentsRoutes;
