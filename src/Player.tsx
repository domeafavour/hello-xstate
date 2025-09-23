import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { playerMachine } from "./playerMachine";

export function Player() {
  const [state, send] = useMachine(playerMachine);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) {
        return;
      }
      if (e.key === "ArrowLeft") {
        send({ type: "START_WALKING", direction: "left" });
      } else if (e.key === "ArrowRight") {
        send({ type: "START_WALKING", direction: "right" });
      }
    }
    function handleKeyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        send({ type: "STOP_WALKING" });
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [send]);

  return (
    <div>
      <p>
        Current State: <strong>{state.value}</strong>
      </p>
      <div>{JSON.stringify(state.context)}</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <button
          onMouseDown={() => send({ type: "START_WALKING", direction: "left" })}
          onMouseUp={() => send({ type: "STOP_WALKING" })}
        >
          {"<"}
        </button>
        <button
          onMouseDown={() =>
            send({ type: "START_WALKING", direction: "right" })
          }
          onMouseUp={() => send({ type: "STOP_WALKING" })}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
