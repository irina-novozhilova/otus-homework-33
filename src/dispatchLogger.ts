import type { Store, Middleware } from "./redux";

export function dispatchLogger(
  store: Store,
  ...middlewares: Middleware<any, any>[]
) {
  let { dispatch } = store;
  middlewares.forEach((middleware) => {
    dispatch = middleware(store)(dispatch);
  });
  return { ...store, dispatch };
}
