import { Request, Response, Router } from "express";
import { resetNum } from "..";
import { Users, User } from "../../../models/users";

const u = new Users();

const verifyCode = async (req: Request, res: Response) => {
  const { resetCode, username, newPassword } = req.body;

  try {
    // console.log(resetNum, resetCode);

    if (resetCode === resetNum) {
      const user: User = await u.updatePass(username, newPassword);

      res.json(user);
      return;
    }
    throw new Error("");
  } catch (err) {
    res.status(404).json("wrong reset code");
  }
};

const verifyCodeRoute = Router();

verifyCodeRoute.post("/", verifyCode);

export default verifyCodeRoute;
