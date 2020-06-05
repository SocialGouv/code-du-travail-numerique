export const displayInViewport = (target, rootBoundaries) => {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  target.style.display = "block";
  target.style.top = rootBoundaries.height + "px";

  let targetBounding = target.getBoundingClientRect();

  target.style.left =
    -Math.round((targetBounding.width - rootBoundaries.width) / 2) + "px";

  targetBounding = target.getBoundingClientRect();
  // we are overflowing on the right
  if (targetBounding.right > viewportWidth) {
    target.style.right = "0px";
    target.style.left = "auto";
  }
  // we are overflowing on the left
  if (targetBounding.left < 0) {
    target.style.left = "0px";
    target.style.right = "auto";
  }
  // we are overflwing to the bottom
  if (targetBounding.bottom > viewportHeight) {
    target.style.top = -Math.round(targetBounding.height) + "px"; // don't make it go below header
  }
  // second pass to make sure the first pass did not
  // make the tooltip overflow on the opposite side :o
  targetBounding = target.getBoundingClientRect();
  if (targetBounding.left < 0) {
    target.style.right = targetBounding.left - 10 + "px";
  }
  if (targetBounding.right > viewportWidth) {
    target.style.left = viewportWidth - targetBounding.right - 10 + "px";
  }
  // don't make it go below header
  if (target.getBoundingClientRect().top < 120) {
    target.style.top = rootBoundaries.height + "px";
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
