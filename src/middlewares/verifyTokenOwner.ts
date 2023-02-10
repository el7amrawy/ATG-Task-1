import { User, Users } from "../models/users";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

const u = new Users();

const verifyTokenOwner = (req: Request, res: Response, next: Function) => {
  try {
    const { user_id } = req.params;
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    const tokenUser = Jwt.decode(token) as unknown as User;
    if (tokenUser.id == user_id) {
      next();
      return;
    }
    throw new Error("");
  } catch (err) {
    res.status(406).json("wrong token");
  }
};

export default verifyTokenOwner;
