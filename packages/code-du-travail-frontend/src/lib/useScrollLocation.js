import { useCallback, useRef, useState } from "react";

import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";

export function useWindowScrollPosition() {
  const throttleMs = 30;

  const [scrollInfo, setScrollInfo] = useState({
    direction: "down",
    x: 0,
    y: 0,
  });

  const isThrottlingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (isThrottlingRef.current) {
      return;
    }
    isThrottlingRef.current = true;
    setTimeout(() => {
      const currentPosition = {
        x: window.scrollX || window.pageXOffset, // support ie11
        y: window.scrollY || window.pageYOffset, // support ie11
      };
      setScrollInfo((previousPosition) => ({
        direction: currentPosition.y >= previousPosition.y ? "down" : "up",
        prevX: previousPosition.x,
        prevY: previousPosition.y,
        x: currentPosition.x,
        y: currentPosition.y,
      }));
      isThrottlingRef.current = false;
    }, throttleMs);
  }, []);
  // avoid SSR warning
  useIsomorphicLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollInfo;
}
