import { Request, Response, Router } from "express";
import usersRoutes from "../handlers/users";

const routes: Router = Router();

routes.use("/users", usersRoutes);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).send("<h1>404 not found</h1>");
});

export default routes;
