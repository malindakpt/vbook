import { BaseService } from "../BaseService";
import { Express, Request } from "express-serve-static-core";
import axios from "axios";
import { ClientEnvConfig } from "./types/ClientEnvConfig";
import { ConfigEnvironment } from "./enums/ConfigEnvironment";
import { ClientConfig } from "./types/ClientConfig";
import { ControlledProjects } from "./types/ControlledProjects";
import fs from 'fs';
import { AuthenticatedRequest } from "../../types";

export class ConfigService extends BaseService {

  addRouteHandlers(app: Express): void {
    app.get("/allowedProjects", async (req, res) => {
      const dat = await this.readConfig();
      const { project, env } = req.query as any;
      if (
        env &&
        typeof env === "string" &&
        project &&
        typeof project === "string"
      ) {
        const clientConfig = JSON.parse(dat);
        const conf = this.getClientJson(project, env, clientConfig)

        const isAllowed = this.isProjectAllowed(project, conf.projects);
        res.send({ isAllowed });
      } else {
        console.log('Invalid project or env');
        res.send({});
      }
    });

    app.get("/purewebConfig", async (req, res) => {
      const { project, env } = req.query as any;
      const dat = await this.readConfig();
      if 
        (project &&
        typeof project === "string" &&
        env &&
        typeof env === "string"
      ) {
        const clientConfig = JSON.parse(dat);
        const conf = this.getClientJson(project, env, clientConfig)
        res.send(conf);
      } else {
        console.log('Invalid project or env');
        res.send({});
      }
    });
  }

  private async readConfig() {
    return new Promise<string>((resolve)=> {
      fs.readFile('clientConfig.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        resolve(data);
      });
    });
  }
  
  private isProjectAllowed = (
      project: string,
      controlledProjects: ControlledProjects | undefined
    ) => {
      if (controlledProjects) {
        if (controlledProjects.controlType === 'allowedList') {
          return controlledProjects.projects.includes(project);
        }
        return !controlledProjects.projects.includes(project);
      }
      return true;
  };

  private getClientJson(
    project: string = 'default',
    environment: string = ConfigEnvironment.DEFAULT,
    config: ClientEnvConfig,
  ): ClientConfig {
    const defaultConfig = config.default.default;
    const defaultEnvConfig = config.default[environment as ConfigEnvironment];
  
    const tenantConfig = config[project] ? config[project].default : {};
    const tenantEnvConfig = config[project] ? config[project][environment as ConfigEnvironment] : {};
  
    const clientOptions = {
      ...defaultConfig,
      ...defaultEnvConfig,
      ...tenantConfig,
      ...tenantEnvConfig,
    };
    return clientOptions;
  };

  // private fetchConfig(configUrl: string, tenant: string, env: string) {    
  //   return new Promise((resolve) => {
  //     axios
  //     .get(configUrl)
  //     .then((res) => {
  //       const conf = res.data;
  //       const tenantConf = this.getClientJson(tenant, env, conf);
  //       console.log(`statusCode: ${res.status}`);
  //       console.log(res.data);
  //       resolve(tenantConf);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       resolve({});
  //     });
  //   });
  // }
}
