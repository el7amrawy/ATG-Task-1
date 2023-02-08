import { Request, Response } from "express";
import { Like, Likes } from "../models/likes";

const l = new Likes();

const checkLikes = async (req: Request, res: Response, next: Function) => {
  try {
    const creator_id = req.params.user_id;
    const post_id = req.params.post_id;

    const like: Like = await l.show(creator_id, post_id);

    if (like === undefined) {
      return next();
    }
    throw new Error("");
  } catch (err) {
    res.status(403).json("user already liked this post");
  }
};

export default checkLikes;
