import debug from 'debug';

let loggers = {};

export default (namespace) => {
  if (loggers[namespace]) return loggers[namespace];

  loggers[namespace] = {
    info: debug(`toolProject:info:${namespace}`),
    error: debug(`toolProject:error:${namespace}`),
    warn: debug(`toolProject:warn:${namespace}`),
    verbose: debug(`toolProject:verbose:${namespace}`),
    debug: debug(`toolProject:debug:${namespace}`),
  };

  return loggers[namespace];
};
