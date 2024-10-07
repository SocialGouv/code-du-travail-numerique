import { Reducer, useEffect, useReducer } from "react";
import { SearchParams } from "../EnterpriseSearch/EntrepriseSearchInput/SearchEnterpriseInput";

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
  action: FecthActions<A>,
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
        data: undefined,
        error: undefined,
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
        error: action.payload,
        isError: true,
        isLoading: false,
      };
    default:
      throw new Error(`Actions ${action["type"]} is not implemented`);
  }
};

type Fetcher<Result> = (searchParams: SearchParams) => Promise<Result>;

/**
 * a factory function that return a suggesterHook that
 * use fetcher to return result
 * @param fetcher an async function that should receive only one argument
 * @param onResult callback when new results are found
 * @returns a hook function
 */
export function createSuggesterHook<Result>(
  fetcher: Fetcher<Result>,
  onResult: (searchParams: SearchParams) => void,
) {
  return function (searchParams: SearchParams): FetchReducerState<Result> {
    const [state, dispatch] = useReducer<
      Reducer<FetchReducerState<Result>, FecthActions<Result>>
    >(dataFetchReducer, {
      isError: false,
      isLoading: false,
    });
    useEffect(() => {
      let shouldCancel = false;

      async function fetchData() {
        if (!searchParams.query) {
          dispatch({ type: Actions.reset });
          return;
        }
        dispatch({ type: Actions.init });
        try {
          const results = await fetcher(searchParams);
          if (shouldCancel) {
            return;
          }

          onResult(searchParams);

          dispatch({ payload: results, type: Actions.success });
        } catch (error) {
          dispatch({ payload: error, type: Actions.failure });
        }
      }

      fetchData();
      return () => {
        shouldCancel = true;
      };
    }, [JSON.stringify(searchParams)]);
    return state;
  };
}
