import { Request, Response, Router } from "express";
import { Users } from "../../models/users";
import sendEmail from "../../services/mail";
import verifyCodeRoute from "./verifycode";

const u = new Users();
let resetNum = genResetNum();

const resetPassword = async (req: Request, res: Response) => {
  const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  const { username } = req.body.user;
  try {
    const email = await u.getEmail(username);
    if (email.length) {
      sendEmail(email, "Reset Password", `reset code is ${resetNum}`);
      res.json({
        status: `reset email sent to ${email}`,
        url: baseUrl + "/verifyCode",
      });
      return;
    }
    throw new Error("");
  } catch (err) {
    res.status(404).json("user not found");
  }
};

const resetPasswordRoute = Router();

resetPasswordRoute.use("/verifyCode", verifyCodeRoute);

resetPasswordRoute.post("/", resetPassword);

export default resetPasswordRoute;

function genResetNum() {
  const n = String(Math.floor(Math.random() * (9999 - 1) + 1));
  let st = n;
  for (let i = 0; i < 4 - n.length; i++) {
    st = 0 + st;
  }
  return st;
}
export { resetNum, resetPasswordRoute };
