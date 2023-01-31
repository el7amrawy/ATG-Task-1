import { Request, Response, Router } from "express";
import usersRoutes from "../handlers/users";
import resetPasswordRoute from "./reset-Password";

const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/resetpassword", resetPasswordRoute);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("<h1>404 not found</h1>");
  //   sendEmail(
  //     "alihamdyhamdy.27@mail.ru",
  //     "Reset Password",
  //     "recovery number is 122343"
  //   );
});

export default routes;
