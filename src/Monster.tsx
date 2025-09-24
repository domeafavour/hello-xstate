import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { MachineCard } from "./MachineCard";
import { monsterMachine } from "./monsterMachine";

export function Monster() {
  const [state, send] = useMachine(monsterMachine);
  useEffect(() => {
    const abortController = new AbortController();
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.repeat) {
          return;
        }
        switch (e.key) {
          case "ArrowRight": {
            send({ type: "WALK", direction: "right" });
            break;
          }
          case "ArrowLeft": {
            send({ type: "WALK", direction: "left" });
            break;
          }
          case " ": {
            send({ type: "JUMP" });
            break;
          }
          case "a": {
            send({ type: "ATTACK" });
            break;
          }
          default: {
            break;
          }
        }
      },
      {
        signal: abortController.signal,
      }
    );
    window.addEventListener(
      "keyup",
      (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          send({ type: "STOP" });
        }
      },
      {
        signal: abortController.signal,
      }
    );
    return () => {
      abortController.abort();
    };
  }, [send]);

  return (
    <MachineCard state={state}>
      <div>
        {state.tags.has("attacking_one") ? "ONE" : null}
        {state.tags.has("attacking_two") ? "TWO" : null}
      </div>
    </MachineCard>
  );
}
