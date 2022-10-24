import { config } from "config";
import express from "express";
import { setUserRoutes } from "./routes";

const app = express();
setUserRoutes(app);

export const startApplication = () => {
  app.listen(config.port, function () {
    console.log("app listening at port %s", config.port);
  });
};
