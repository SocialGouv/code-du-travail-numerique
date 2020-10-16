export const displayInViewport = (target, root) => {
  const rootBoundaries = root.getBoundingClientRect();
  const viewportHeight =
    document.documentElement.clientHeight || window.innerHeight;
  const viewportWidth =
    document.documentElement.clientWidth || window.innerWidth;

  target.style.display = "block";
  target.style.top = root.offsetHeight + "px";

  const leftShift = -Math.round((target.offsetWidth - root.offsetWidth) / 2);

  target.style.left = leftShift + "px";

  const targetBounding = target.getBoundingClientRect();
  if (targetBounding.right > viewportWidth) {
    target.style.left =
      leftShift - (targetBounding.right - viewportWidth) - 10 + "px";
  }
  if (targetBounding.left < 0) {
    target.style.left = leftShift - targetBounding.left + 10 + "px";
  }
  if (targetBounding.bottom > viewportHeight) {
    if (rootBoundaries.top - target.offsetHeight > 0) {
      target.style.top = -Math.round(target.offsetHeight) + "px";
    }
  }
};

const throttler = function (fn, interval) {
  let ready = true;
  return function (...args) {
    if (!ready) return;
    if (ready) {
      ready = false;
      window.setTimeout(() => {
        ready = true;
      }, interval);
      return fn(...args);
    }
  };
};

export const throttledDisplayInViewport = throttler(displayInViewport, 10);
