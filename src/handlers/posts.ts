import { Post, Posts } from "../models/posts";
import { Request, Response, Router } from "express";

const p = new Posts();

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.post_id;
    const post: Post = await p.show(id);

    res.json(post);
  } catch (err) {
    res.status(404).json(`post not found ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;
    const content = req.body.content;

    const post: Post = await p.create(user_id, content);

    res.json(post);
  } catch (err) {
    res.status(400).json(`couldn't create post ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;
    const content = req.body.content;

    const post: Post = await p.update(post_id, content);

    res.json(post);
  } catch (err) {
    res.status(400).json(`couldn't update post ${err}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;

    const post: Post = await p.remove(post_id);

    res.json({
      status: "post deleted successfully",
      post,
    });
  } catch (err) {
    res.status(404).json(`couldn't delete post ${err}`);
  }
};

const postsRoutes = Router({ mergeParams: true });

postsRoutes.post("/", create);
postsRoutes.get("/:post_id", show);
postsRoutes.post("/:post_id", update);
postsRoutes.delete("/:post_id", remove);

export default postsRoutes;
