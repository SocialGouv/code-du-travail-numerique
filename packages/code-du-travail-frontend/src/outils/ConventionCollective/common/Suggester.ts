import { Reducer, useEffect, useReducer } from "react";

export enum Status {
  idle = "idle",
  loading = "loading",
  success = "success",
  error = "error",
}

export enum Actions {
  reset = "reset",
  init = "init",
  success = "success",
  failure = "failure",
}

export type FecthActions<A> =
  | { type: Actions.init }
  | { type: Actions.reset }
  | { type: Actions.success; payload: A }
  | { type: Actions.failure; payload: Error };

export type FetchReducerState<A> = {
  isError: boolean;
  isLoading: boolean;
  data?: A;
  error?: Error;
};

const dataFetchReducer = <A>(
  state: FetchReducerState<A>,
  action: FecthActions<A>
): FetchReducerState<A> => {
  switch (action.type) {
    case Actions.init:
      return {
        isError: false,
        isLoading: true,
      };
    case Actions.reset:
      return {
        ...state,
        data: null,
        error: null,
        isError: false,
        isLoading: false,
      };
    case Actions.success:
      return {
        ...state,
        data: action.payload,
        isError: false,
        isLoading: false,
      };
    case Actions.failure:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      throw new Error(`Actions ${action["type"]} is not implemented`);
  }
};

/**
 * a factory function that return a suggesterHook that
 * use fetcher to return result
 * @param fetcher an async function that should receive only one argument
 * @returns a hook function
 */
export function createSuggesterHook<A, I>(fetcher: (params: I) => Promise<A>) {
  return function (params: I): FetchReducerState<A> {
    const [state, dispatch] = useReducer<
      Reducer<FetchReducerState<A>, FecthActions<A>>
    >(dataFetchReducer, { isError: false, isLoading: false });
    useEffect(() => {
      let shouldCancel = false;
      async function fetchData() {
        if (!params || !params[0]) {
          dispatch({ type: Actions.reset });
          return;
        }
        dispatch({ type: Actions.init });
        try {
          const results = await fetcher(params);
          if (shouldCancel) {
            return;
          }
          dispatch({ payload: results, type: Actions.success });
        } catch (error) {
          dispatch({ payload: error, type: Actions.failure });
        }
      }
      fetchData();
      return () => {
        shouldCancel = true;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(params)]);
    return state;
  };
}
