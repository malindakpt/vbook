import { config } from "config";
import express from "express";
import { setUserRoutes } from "../routes/user.routes";
import bodyParser from 'body-parser';
import cors from 'cors';
import { logger } from "middlewares/logger.middleware";
import { validateToken } from "middlewares/token.middleware";
import cookies from 'cookie-parser';
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use(cookies());
app.use(logger)
app.use(validateToken);

setUserRoutes(app);

app.get('/', (req, res) => {
  res.status(200).send('<h1>App is working</h1>')
});

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   res.header('Access-Control-Expose-Headers', 'Content-Length');
//   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
//   if (req.method === 'OPTIONS') {
//       return res.sendStatus(200);
//   } else {
//       return next();
//   }
// });

export const startApplication = () => {
  app.listen(config.port, function () {
    console.log("app listening at port %s", config.port);
  });
};
