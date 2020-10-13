export const displayInViewport = (target, root) => {
  const rootBoundaries = root.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

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
    // don't make it go top if it's below header ~= 130 px at max on mobile
    if (rootBoundaries.top - target.offsetHeight > 130) {
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
