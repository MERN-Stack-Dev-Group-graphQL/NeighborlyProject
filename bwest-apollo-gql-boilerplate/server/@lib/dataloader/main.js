import DataLoader from 'dataloader';

export default (batchFn, keyFn = () => 'simple', opts) => {
  const globalCache = {};
  return (context, args) => {
    const key = keyFn(args);
    const requestCache = globalCache[key];
    const loader = requestCache && requestCache.get(context);
    if (loader) return loader;
    else {
      const newLoader = new DataLoader((keys) => batchFn(keys, args, context), opts);

      if (requestCache) requestCache.set(context, newLoader);
      else globalCache[key] = new WeakMap([[context, newLoader]]);

      return newLoader;
    }
  };
};
