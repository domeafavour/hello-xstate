export function frame(callback: (stop: () => void) => void, duration: number) {
  let raf: number;
  let previousTime: number = Date.now();

  function cleanup() {
    cancelAnimationFrame(raf);
  }

  function _run() {
    callback(cleanup);

    raf = requestAnimationFrame((currentTime) => {
      // update per duration ms
      if (currentTime - previousTime > duration) {
        previousTime = currentTime;
        _run();
      } else {
        raf = requestAnimationFrame(_run);
      }
    });
  }
  _run();

  return cleanup;
}
