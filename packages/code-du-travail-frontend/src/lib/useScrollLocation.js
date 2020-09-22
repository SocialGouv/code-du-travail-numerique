import { useCallback, useLayoutEffect, useRef, useState } from "react";

const isServer = typeof window === "undefined";

function getWindowScrollPosition() {
  if (isServer) {
    return { x: 0, y: 0 };
  }
  return {
    x: window.scrollX || window.pageXOffset, // support ie11
    y: window.scrollY || window.pageYOffset, // support ie11
  };
}

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
      const currentPosition = getWindowScrollPosition();
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

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollInfo;
}
