import { Request, Response, Router } from "express";
import { Like, Likes } from "../models/likes";
import checkLikes from "../middlewares/checkLikes";

const l = new Likes();

const index = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;

    const nLikes = await l.index(post_id);

    res.json({ post_id, number_of_likes: nLikes });
  } catch (err) {
    res.status(400).json(`couldn't get number of likes ${err}`);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;
    const creator_id = req.params.user_id;

    const like: Like = await l.create(post_id, creator_id);

    res.json(like);
  } catch (err) {
    res.status(400).json(`couldn't like post ${err}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const creator_id = req.params.user_id;

    const like: Like = await l.remove(creator_id);

    res.json({ status: "post unliked successfully", like });
  } catch (err) {
    res.status(400).json(`couldn't unlike post ${err}`);
  }
};

const likesRoutes = Router({ mergeParams: true });

likesRoutes.get("/", index);
likesRoutes.post("/", checkLikes, create);
likesRoutes.delete("/", remove);

export default likesRoutes;
