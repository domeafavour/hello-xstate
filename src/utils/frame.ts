export function frame(callback: (stop: () => void) => void, duration: number) {
  let raf: number;
  let previousTime: number = Date.now();
  let isStopped = false;

  function cleanup() {
    isStopped = true;
    cancelAnimationFrame(raf);
  }

  function _run() {
    if (isStopped) return;
    callback(cleanup);
    if (isStopped) return;

    raf = requestAnimationFrame((currentTime) => {
      if (isStopped) return;
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
