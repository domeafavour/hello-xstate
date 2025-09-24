import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { jumpMachine } from "./jumpMachine";
import { Person } from "./Person";

export function Jump() {
  const [state, send] = useMachine(jumpMachine);
  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.repeat) {
          return;
        }
        switch (e.key) {
          case " ": {
            send({ type: "JUMP" });
            break;
          }
          default: {
            break;
          }
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: 200,
          borderBottom: "2px solid red",
        }}
      >
        {/* Add acceleration */}
        <span
          style={{
            transform: `translateY(-${state.context.y * 3.6}px)`,
          }}
        >
          <Person walking={state.matches("up") || state.matches("down")} />
        </span>
      </div>
    </div>
  );
}
