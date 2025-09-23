import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { Person } from "./Person";
import { playerMachine } from "./playerMachine";

const SCENE_WIDTH = 600;
const ACTOR_WIDTH = 64;

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
      } else if (e.key === " ") {
        send({ type: "JUMP" });
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
        Current State: <strong>{JSON.stringify(state.value)}</strong>
      </p>
      <div
        style={{
          borderBottom: "2px solid red",
          position: "relative",
          width: SCENE_WIDTH,
        }}
      >
        <div
          style={{
            width: ACTOR_WIDTH,
            // transition: "transform 0.2s linear",
            transform: `translate(${
              (SCENE_WIDTH - ACTOR_WIDTH) * (state.context.x / 100)
            }px, ${-state.context.y}px)`,
          }}
        >
          <Person walking={state.matches({ walking: "active" })} />
        </div>
      </div>
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
