import { useLayoutEffect, useRef } from "react";

const isBrowser = typeof window === "undefined";

function getWindowScrollPosition() {
  if (isBrowser) {
    return { x: 0, y: 0 };
  }
  return {
    x: window.scrollX || window.pageXOffset, // support ie11
    y: window.scrollY || window.pageYOffset, // support ie11
  };
}

export function useWindowScrollPosition(effect, deps = []) {
  const positionRef = useRef(getWindowScrollPosition());
  const throttleMs = 30;
  const throttleRef = useRef(null);

  function triggerWindowPositionUpdate() {
    const currentPosition = getWindowScrollPosition();
    effect({
      direction: currentPosition.y >= positionRef.current.y ? "down" : "up",
      prevX: positionRef.current.x,
      prevY: positionRef.current.y,
      x: currentPosition.x,
      y: currentPosition.y,
    });
    positionRef.current = currentPosition;
    throttleRef.current = null;
  }
  const handleScroll = () => {
    if (throttleMs) {
      if (throttleRef.current === null) {
        throttleRef.current = setTimeout(
          triggerWindowPositionUpdate,
          throttleMs
        );
      }
    } else {
      triggerWindowPositionUpdate();
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [...deps]);
}
