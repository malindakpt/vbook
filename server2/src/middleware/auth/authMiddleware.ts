import { NextFunction, Request, Response } from "express";
import { extractAuthHeaders } from "./utils/request";
import { AuthenticatedRequest } from "types";
import authService from "./services/authService";
import { APIError } from "@cognite/error";
import { errors } from "./errors";

// Contacting the ms identity server 
const authMiddleware = async (
  request: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { apiKey, Authorization } = extractAuthHeaders(request);
 
    if (apiKey) {
      const user = await authService.decodeApiKeyToken(apiKey);
      request.user = user;
      request.authScheme = { apiKey };
    } else if (Authorization) {
      const accessToken = Authorization.split('Bearer ')[1];
      const user = await authService.decodeJwtToken(accessToken);
      request.user = user;
      request.authScheme = { accessToken };
    } else {
      console.log("No auth header found");
      // Decide what to do here. 
       throw new APIError({
      status: 401,
      message: "No token, authorization denied",
    });
    }
    next();
}

export default authMiddleware;