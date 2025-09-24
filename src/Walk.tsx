import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { walkMachine } from "./walkMachine";

export function Walk() {
  const [state, send] = useMachine(walkMachine);
  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.repeat) {
          return;
        }
        switch (e.key) {
          case "ArrowLeft":
            send({ type: "WALK", direction: "left" });
            break;
          case "ArrowRight":
            send({ type: "WALK", direction: "right" });
            break;
          case " ":
            send({ type: "JUMP" });
            break;
        }
      },
      {
        signal: abortController.signal,
      }
    );
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          send({ type: "STOP" });
        }
      },
      { signal: abortController.signal }
    );
    return () => {
      abortController.abort();
    };
  }, [send]);
  return (
    <div>
      <h1>{JSON.stringify(state.value)}</h1>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        <button
          type="button"
          onClick={() => send({ type: "WALK", direction: "right" })}
        >
          Forward
        </button>
        <button
          type="button"
          onClick={() => send({ type: "WALK", direction: "left" })}
        >
          Backward
        </button>
        <button onClick={() => send({ type: "STOP" })}>Stop</button>
      </div>
    </div>
  );
}
