import { Server } from "../Server";
import { Express } from 'express-serve-static-core';

export abstract class BaseService {

    protected server: Server;
    abstract addRouteHandlers(app: Express): void;

    constructor(server: Server){
        this.server = server;
        this.addRouteHandlers(this.server.getApp());
    }
}