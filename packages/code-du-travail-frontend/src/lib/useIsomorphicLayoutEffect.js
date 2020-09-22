// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85#gistcomment-3318852
// Avoid SSR warning
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
