import { useState, useEffect } from "react";

function getWindowDimensions() {
  return typeof window !== "undefined"
    ? {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    : {
        width: 1200,
        height: 1000,
      };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
