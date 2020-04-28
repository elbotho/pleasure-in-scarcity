var xDown = null;
var yDown = null;

export default function swipeDetect(target, func1, func2) {
  target.addEventListener("touchstart", handleTouchStart, { passive: true });
  target.addEventListener(
    "touchmove",
    handleTouchMove.bind(null, func1, func2),
    { passive: true }
  );
  target.addEventListener("mousedown", handleTouchStart, false);
  target.addEventListener(
    "mousemove",
    handleTouchMove.bind(null, func1, func2),
    false
  );
}

function getXandY(e) {
  if (e.touches) return [e.touches[0].clientX, e.touches[0].clientY];
  return [e.clientX, e.clientY];
}

function handleTouchStart(e) {
  const pointerPos = getXandY(e);
  xDown = pointerPos[0];
  yDown = pointerPos[1];
}

function handleTouchMove(func1, func2, e) {
  if (!xDown || !yDown) {
    return;
  }

  const pointerPos = getXandY(e);
  var xUp = pointerPos[0];
  var yUp = pointerPos[1];

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) < Math.abs(yDiff)) return;

  if (xDiff > 0) {
    func1();
  } else {
    func2();
  }

  /* reset values */
  xDown = null;
  yDown = null;
}
