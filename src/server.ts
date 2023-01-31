import express from "express";
import routes from "./api";

const app: express.Application = express();

app.use(express.json());
app.use(routes);

const port = 5000;

app.listen(port, () => {
  process.stdout.write(`server started at http://localhost:${port}\n`);
});
