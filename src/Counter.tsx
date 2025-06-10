import { useMachine } from "@xstate/react";
import { countMachine } from "./countMachine";

export function Counter() {
  const [state, send] = useMachine(countMachine);
  return (
    <div>
      <span>{state.context.count}</span>
      <button
        type="button"
        onClick={() => {
          send({ type: "INCREMENT" });
        }}
      >
        +1
      </button>
    </div>
  );
}
