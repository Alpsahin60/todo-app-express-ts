declare module 'express-serve-static-core' {
  interface Request {
    oidc: {
      isAuthenticated: () => boolean;
      login: (options?: { returnTo?: string }) => void;
      user?: {
        sub?: string;
        name?: string;
        email?: string;
        sid?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
      };
    };
  }
}

export {};
