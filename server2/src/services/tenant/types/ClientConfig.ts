import { ControlledProjects } from "./ControlledProjects";

export type ClientConfig  = {
    environmentId?: string;
    launchType?: string;
    projectId?: string;
    modelId?: string;
    version?: string;
    endpoint?: string;
    usePointerLock?: boolean;
    pointerLockRelease?: boolean;
    projects?: ControlledProjects;
  }

  