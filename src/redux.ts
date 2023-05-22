export type Store<State = any, Action = { type: string }> = {
  getState(): State;
  dispatch(action: Action): any;
  subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
  state: State | undefined,
  action: Action
) => State;

export type Middleware<State, Action> = (
  store: Store<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
  reducer: Reducer<State, Action>,
  initialState?: State | undefined,
  middlewares?: Middleware<State, Action>[]
) => Store<State, Action>;

export const configureStore: ConfigureStore<any, any> = (
  reducer: Reducer<any, any>,
  initState?: any
) => {
  let state = initState;
  const cbs: Set<() => void> = new Set();
  return {
    getState() {
      return state;
    },
    subscribe(cb: () => void) {
      cbs.add(cb);
      return () => {
        cbs.delete(cb);
      };
    },
    dispatch(action: { type: string; payload?: any }) {
      state = reducer(state, action);
      cbs.forEach((cb) => {
        cb();
      });
    },
  };
};
