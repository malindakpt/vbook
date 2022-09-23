import express from 'express';
import { Express } from 'express-serve-static-core';
import cors from 'cors';

export class Server {
  private static instance: Server;
  private app: Express = express();
  private port = 3001;

  private constructor() {}

  public start() {
    this.configureMiddleware();
    this.startServices();

    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  configureMiddleware() {
    this.app.use(cors());
    // this.app.use(asyncMiddleware<AuthenticatedRequest>(authMiddleware));
    // this.app.use(queryMiddleware)
  }

  private startServices() {
    // new ConfigService(this);
    // new PurewebService(this);
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  public getApp() {
    return this.app;
  }
}
