export type APIErrorDTO = {
  error: {
    status: number;
    message: string;
  };
};

export type CdfAPIErrorDTO = {
  error: {
    code: number;
    message: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExpressError = any;