import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";

export function Player() {
  const [state, send] = useMachine(playerMachine);

  return (
    <div>
      <p>Current State: {state.value}</p>
      <div>{JSON.stringify(state.context)}</div>
      <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
        <button
          onMouseDown={() => send({ type: "START_WALKING", direction: "left" })}
          onMouseUp={() => send({ type: "STOP_WALKING" })}
        >
          walking left
        </button>
        <button
          onMouseDown={() =>
            send({ type: "START_WALKING", direction: "right" })
          }
          onMouseUp={() => send({ type: "STOP_WALKING" })}
        >
          walking right
        </button>

        <button
          onClick={() => send({ type: "STOP_WALKING" })}
          disabled={!state.can({ type: "STOP_WALKING" })}
        >
          stop walking
        </button>
      </div>
    </div>
  );
}
