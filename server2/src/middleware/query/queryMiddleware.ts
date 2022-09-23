import {Request, Response} from 'express';
import { APIError } from "@cognite/error";
import { AuthenticatedRequest } from "types";
import { errors } from 'middleware/auth/errors';

const queryMiddleware = (req:any, _res:any, next:any) =>{
const {project} = req.query;
if(project && !isProjectAccessible(project, req)){
    throw new APIError({status:403,message:errors.forbiddenProject});
}
    next();
}

const isProjectAccessible =(projectName : String, request : Request): Boolean=>{
    const authenticatedRequest : AuthenticatedRequest = request as AuthenticatedRequest;
    const index = authenticatedRequest.user.projects.findIndex(project=> project.projectUrlName === projectName);
    return index !== -1;
  }

export default queryMiddleware;