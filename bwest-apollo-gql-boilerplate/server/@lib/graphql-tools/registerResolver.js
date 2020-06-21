import env from "@lib/env";

const resolvers = {};

export const registerResolver = (name, func, overrides = {}) => {
  if (typeof func !== "function")
    throw `registerResolver: "${name}" is not a function`;
  if (resolvers[name]) throw `registerResolver: "${name}" is already defined`;
  if (Object.values(overrides).length > 1)
    throw `registerResolver: "${name}" can only override one env`;
  if (overrides.local && env.STAGE === "local") {
    resolvers[name] = overrides.local;
  } else if (overrides.dev && ["local", "dev"].includes(env.STAGE)) {
    resolvers[name] = overrides.dev;
  } else if (
    overrides.staging &&
    ["local", "dev", "staging"].includes(env.STAGE)
  )
    resolvers[name] = overrides.staging;
  else {
    resolvers[name] = func;
  }
};

export const getResolver = (name) => resolvers[name];

export const getAllResolversByKey = (key) =>
  Object.keys(resolvers)
    .filter((k) => k.indexOf(key) !== -1)
    .reduce((sum, current) => {
      const [type, functionName] = current.split(".");
      if (!sum[type]) sum[type] = {};
      sum[type][functionName] = resolvers[current];
      return sum;
    }, {});

export const registerResolversFromObject = (parentName, resObj) => {
  Object.keys(resObj).forEach((key) => {
    registerResolver(parentName + "." + key, resObj[key]);
  });
};
