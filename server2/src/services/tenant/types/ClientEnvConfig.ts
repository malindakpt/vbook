import { ConfigEnvironment } from "../enums/ConfigEnvironment";
import { ClientConfig } from "./ClientConfig";

export type ClientEnvConfig = {
  [client: string]: {
    [env in ConfigEnvironment]?: ClientConfig;
  };
}

