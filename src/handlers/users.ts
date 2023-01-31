import { Router, Request, Response } from "express";
import { User, Users } from "../models/users";

const u = new Users();

const create = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body.user;

  try {
    const user: User = await u.create(email, password, username, name);
    res.json(user);
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { username, password } = req.body.user;
  try {
    const user = await u.authenticate(username, password);
    if (user) {
      res.json(user);
      return;
    }
    throw new Error("");
  } catch (err) {
    res.status(400).json("wrong username or password");
  }
};

const usersRoutes = Router();

usersRoutes.post("/registrate", create);
usersRoutes.post("/login", authenticate);

export default usersRoutes;
