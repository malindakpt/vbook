import { Express } from "express-serve-static-core";
import PlatformAdmin, { PlatformApi } from '@pureweb/platform-admin-sdk';
import { BaseService } from "../BaseService";
import config from "config";

export class PurewebService extends BaseService {
     
  addRouteHandlers(app: Express): void {        
      app.get('/credentials', async (_req:any, res:any) => {
  
        const {apiUrl, clientId, clientSecret} = config.pureweb;
        const api = new PlatformApi({ baseUrl: apiUrl});

        const project = await api.getAccessToken(clientId, clientSecret, [
          'launch_request:*',
          'model:read',
        ]);

      const admin = new PlatformAdmin(clientId, 
      clientSecret, 
      {
        platformUrl: apiUrl,
        debug: true
      });

      await admin.authenticate();
      res.json(project);
});
    }
}