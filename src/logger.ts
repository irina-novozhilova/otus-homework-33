import type { Middleware } from "./redux";

export const logger: Middleware<any, () => void> =
  (store) => (next) => (action) => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
  };
