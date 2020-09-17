import { useCallback, useEffect, useRef, useState } from "react";

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
  const [scrollInfo, setScrollInfo] = useState({ direction: "down", y: 0 });
  const throttleMs = 30;

  const isThrottlingRef = useRef(false);
  const previousPosition = useRef(getWindowScrollPosition());

  const handleScroll = useCallback(() => {
    if (!isThrottlingRef.current) {
      isThrottlingRef.current = true;
      setTimeout(() => {
        const currentPosition = getWindowScrollPosition();
        setScrollInfo({
          direction:
            currentPosition.y >= previousPosition.current.y ? "down" : "up",
          prevX: previousPosition.current.x,
          prevY: previousPosition.current.y,
          x: currentPosition.x,
          y: currentPosition.y,
        });
        isThrottlingRef.current = false;
        previousPosition.current = currentPosition;
      }, throttleMs);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return scrollInfo;
}
