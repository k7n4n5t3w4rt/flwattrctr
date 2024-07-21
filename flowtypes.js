type JiraStatus = {
  id: string,
  name: string,
  statusCategory: {
    name: string,
  },
};
type Status = {
  key: string,
  value: {
    name: string,
    statusCategory: string,
    used: boolean,
    orderWeight: number,
  },
};

type StoredStatus = {
  name: string,
  statusCategory: string,
  used: boolean,
  orderWeight: number,
};

// type ReturnedData = {
//   results: Array<Result>,
// };

type StatusPayload = {
  payload: {
    statuses: Array<Status>,
  },
  context: any,
};

type QueryPayload = {
  payload: Object,
  context: any,
};

type Results = {
  results: Array<Result>,
};

type Result = {
  key: string,
  value: {
    name: string,
    statusCategory: string,
    used: boolean,
    orderWeight: number,
  },
};

declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "@forge/resolver" {
  declare module.exports: any;
}

declare module "@forge/api" {
  declare module.exports: any;
}

declare module "../../web_modules/@forge/bridge.js" {
  declare module.exports: any;
}

declare module "../../web_modules/@forge/resolver.js" {
  declare module.exports: any;
}

declare module "../../web_modules/@forge/api.js" {
  declare module.exports: any;
}

declare module "../web_modules/@forge/bridge.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}

declare module "../web_modules/three.js" {
  declare module.exports: any;
}
