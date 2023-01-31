import { Request, Response, Router } from "express";
import usersRoutes from "../handlers/users";
import resetPasswordRoute from "./resetpassword";

const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/resetpassword", resetPasswordRoute);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("<h1>404 not found</h1>");
});

export default routes;
